import {NextResponse} from "next/server";

import {getCurrentSession} from "@/lib/portal/auth";
import {createInvitation, getInvitations, revokeInvitation} from "@/lib/portal/dataStore";
import type {UserRole} from "@/lib/portal/types";

export const GET = async (): Promise<NextResponse> => {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({error: "Unauthenticated"}, {status: 401});
  }

  if (session.role !== "client_owner" && !session.isStudioAdmin) {
    return NextResponse.json({error: "Access denied"}, {status: 403});
  }

  const list = getInvitations(session.organizationId);
  return NextResponse.json({invitations: list});
};

export const POST = async (request: Request): Promise<NextResponse> => {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({error: "Unauthenticated"}, {status: 401});
  }

  if (session.role !== "client_owner" && !session.isStudioAdmin) {
    return NextResponse.json({error: "Access denied"}, {status: 403});
  }

  try {
    const body = (await request.json()) as {
      email?: string;
      role?: UserRole;
      organizationId?: string;
      action?: string;
      invitationId?: string;
    };

    if (body.action === "revoke") {
      if (!body.invitationId) {
        return NextResponse.json({error: "Invitation ID required"}, {status: 400});
      }
      const ok = revokeInvitation(session.organizationId, body.invitationId);
      return NextResponse.json({success: ok});
    }

    if (!body.email) {
      return NextResponse.json({error: "Email is required"}, {status: 400});
    }

    const targetOrgId = body.organizationId || session.organizationId;
    const role = body.role || "client_member";

    // Client owner cannot invite staff
    if (!session.isStudioAdmin && (role === "staff" || role === "studio_admin")) {
      return NextResponse.json({error: "Clients cannot invite staff members"}, {status: 403});
    }

    const newInv = createInvitation(targetOrgId, body.email, role, session);
    return NextResponse.json({success: true, invitation: newInv}, {status: 201});
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to process invitation";
    return NextResponse.json({error: msg}, {status: 500});
  }
};
