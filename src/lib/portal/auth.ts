import {cookies} from "next/headers";

import {
  getMembership,
  getOrganizationById,
  getUserProfile,
  getUserProfileByEmail,
} from "./dataStore";
import type {PortalSession, UserRole} from "./types";

export const SESSION_COOKIE_NAME = "chromapages_session";

export interface SessionTokenPayload {
  uid: string;
  email: string;
  orgId: string;
  role: UserRole;
  issuedAt: number;
}

// Simple deterministic session encoding for server session management
export const encodeSessionToken = (payload: SessionTokenPayload): string => {
  const json = JSON.stringify(payload);
  return Buffer.from(json).toString("base64url");
};

export const decodeSessionToken = (token: string): SessionTokenPayload | null => {
  try {
    const json = Buffer.from(token, "base64url").toString("utf-8");
    const parsed = JSON.parse(json) as SessionTokenPayload;
    if (!parsed.uid || !parsed.email || !parsed.orgId) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

export const getSessionFromToken = (token: string): PortalSession | null => {
  const payload = decodeSessionToken(token);
  if (!payload) {
    return null;
  }

  // Real-time verification: check user profile
  const user = getUserProfile(payload.uid);
  if (!user) {
    return null;
  }

  // Real-time verification: check active organization membership
  const targetOrgId = user.currentOrganizationId || payload.orgId;
  const org = getOrganizationById(targetOrgId);
  if (!org) {
    return null;
  }

  let role: UserRole = "client_member";
  if (user.isStudioAdmin) {
    role = "studio_admin";
  } else {
    const membership = getMembership(targetOrgId, user.uid);
    if (!membership) {
      // Access revoked!
      return null;
    }
    role = membership.role;
  }

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    role,
    organizationId: org.id,
    organizationName: org.name,
    isStaff: user.isStaff || user.isStudioAdmin,
    isStudioAdmin: user.isStudioAdmin,
  };
};

export const getCurrentSession = async (): Promise<PortalSession | null> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie?.value) {
    return null;
  }
  return getSessionFromToken(sessionCookie.value);
};

export const requireSession = async (): Promise<PortalSession> => {
  const session = await getCurrentSession();
  if (!session) {
    throw new Error("UNAUTHENTICATED");
  }
  return session;
};

export const requireStaffSession = async (): Promise<PortalSession> => {
  const session = await requireSession();
  if (!session.isStaff && !session.isStudioAdmin) {
    throw new Error("UNAUTHORIZED_STAFF_ONLY");
  }
  return session;
};

export const requireClientOwnerSession = async (): Promise<PortalSession> => {
  const session = await requireSession();
  if (session.role !== "client_owner" && !session.isStudioAdmin) {
    throw new Error("UNAUTHORIZED_OWNER_ONLY");
  }
  return session;
};

export const authenticateUser = (
  email: string,
  _password?: string
): {token: string; session: PortalSession} | {error: string} => {
  void _password;
  const user = getUserProfileByEmail(email);
  if (!user) {
    return {error: "Invalid email or password."};
  }

  const org = getOrganizationById(user.currentOrganizationId);
  if (!org) {
    return {error: "No active organization assigned."};
  }

  let role: UserRole = "client_member";
  if (user.isStudioAdmin) {
    role = "studio_admin";
  } else {
    const membership = getMembership(org.id, user.uid);
    if (!membership) {
      return {error: "Membership has been revoked."};
    }
    role = membership.role;
  }

  const payload: SessionTokenPayload = {
    uid: user.uid,
    email: user.email,
    orgId: org.id,
    role,
    issuedAt: Date.now(),
  };

  const token = encodeSessionToken(payload);
  const session: PortalSession = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    role,
    organizationId: org.id,
    organizationName: org.name,
    isStaff: user.isStaff || user.isStudioAdmin,
    isStudioAdmin: user.isStudioAdmin,
  };

  return {token, session};
};

export const switchOrganization = (
  userId: string,
  targetOrgId: string
): {success: boolean; error?: string} => {
  const user = getUserProfile(userId);
  if (!user) {
    return {success: false, error: "User not found."};
  }

  if (!user.isStudioAdmin) {
    const membership = getMembership(targetOrgId, userId);
    if (!membership) {
      return {success: false, error: "User is not a member of target organization."};
    }
  }

  const org = getOrganizationById(targetOrgId);
  if (!org) {
    return {success: false, error: "Target organization not found."};
  }

  user.currentOrganizationId = targetOrgId;
  return {success: true};
};
