import {describe, expect, it} from "vitest";

import {
  authenticateUser,
  decodeSessionToken,
  encodeSessionToken,
  getSessionFromToken,
  switchOrganization,
} from "./auth";

describe("Portal Authentication & Session Management", () => {
  it("encodes and decodes session token correctly", () => {
    const payload = {
      uid: "user-sarah-apex",
      email: "sarah.jenkins@apexlegal.example.com",
      orgId: "org-apex-legal",
      role: "client_owner" as const,
      issuedAt: Date.now(),
    };

    const token = encodeSessionToken(payload);
    expect(typeof token).toBe("string");

    const decoded = decodeSessionToken(token);
    expect(decoded?.uid).toBe(payload.uid);
    expect(decoded?.email).toBe(payload.email);
    expect(decoded?.orgId).toBe(payload.orgId);
    expect(decoded?.role).toBe(payload.role);
  });

  it("authenticates valid existing user and returns session and token", () => {
    const authResult = authenticateUser("sarah.jenkins@apexlegal.example.com");
    expect("token" in authResult).toBe(true);

    if ("session" in authResult) {
      expect(authResult.session.displayName).toBe("Sarah Jenkins");
      expect(authResult.session.role).toBe("client_owner");
      expect(authResult.session.organizationName).toBe("Apex Legal Partners");
    }
  });

  it("fails authentication for unknown email", () => {
    const authResult = authenticateUser("stranger@unknown.example.com");
    expect("error" in authResult).toBe(true);
  });

  it("resolves active session from valid token with real-time membership check", () => {
    const authResult = authenticateUser("sarah.jenkins@apexlegal.example.com");
    if ("token" in authResult) {
      const session = getSessionFromToken(authResult.token);
      expect(session).not.toBeNull();
      expect(session?.displayName).toBe("Sarah Jenkins");
      expect(session?.organizationId).toBe("org-apex-legal");
    }
  });

  it("allows switching organization if user is a member of target organization", () => {
    // Staff member Devin Cross (studio admin) can switch
    const switchResult = switchOrganization("user-devin-admin", "org-beacon-wealth");
    expect(switchResult.success).toBe(true);

    // Client member Sarah Jenkins is NOT a member of Beacon Wealth and cannot switch
    const invalidSwitch = switchOrganization("user-sarah-apex", "org-beacon-wealth");
    expect(invalidSwitch.success).toBe(false);
    expect(invalidSwitch.error).toContain("not a member");
  });
});
