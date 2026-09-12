import {NextResponse} from "next/server";

import {getCurrentSession, switchOrganization} from "@/lib/portal/auth";
import {
  createOrganization,
  createProject,
  getOrganizationById,
  getOrganizationMemberships,
  getOrganizations,
  getProjects,
} from "@/lib/portal/dataStore";

export const GET = async (request: Request): Promise<NextResponse> => {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({error: "Unauthenticated"}, {status: 401});
  }

  const {searchParams} = new URL(request.url);
  const listAll = searchParams.get("all") === "true";

  if (listAll && (session.isStaff || session.isStudioAdmin)) {
    const orgs = getOrganizations();
    return NextResponse.json({organizations: orgs});
  }

  const org = getOrganizationById(session.organizationId);
  const projects = getProjects(session.organizationId);
  const members = getOrganizationMemberships(session.organizationId);

  return NextResponse.json({
    organization: org,
    projects,
    members,
  });
};

export const POST = async (request: Request): Promise<NextResponse> => {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({error: "Unauthenticated"}, {status: 401});
  }

  try {
    const body = (await request.json()) as {
      action: string;
      organizationId?: string;
      name?: string;
      domain?: string;
    };

    if (body.action === "switch") {
      if (!body.organizationId) {
        return NextResponse.json({error: "Organization ID is required"}, {status: 400});
      }
      const res = switchOrganization(session.uid, body.organizationId);
      if (!res.success) {
        return NextResponse.json({error: res.error}, {status: 403});
      }
      return NextResponse.json({success: true});
    }

    if (body.action === "create_project") {
      if (!body.name?.trim()) {
        return NextResponse.json({error: "Project name is required"}, {status: 400});
      }
      const targetOrgId = body.organizationId || session.organizationId;
      if (!session.isStaff && !session.isStudioAdmin && session.role !== "client_owner") {
        return NextResponse.json({error: "Access denied"}, {status: 403});
      }
      const newProj = createProject(targetOrgId, body.name.trim(), body.domain?.trim());
      return NextResponse.json({success: true, project: newProj}, {status: 201});
    }

    if (body.action === "create_org") {
      if (!session.isStudioAdmin) {
        return NextResponse.json({error: "Only studio admins can create organizations"}, {status: 403});
      }
      if (!body.name?.trim()) {
        return NextResponse.json({error: "Organization name is required"}, {status: 400});
      }
      const newOrg = createOrganization(body.name.trim(), body.domain?.trim());
      return NextResponse.json({success: true, organization: newOrg}, {status: 201});
    }

    return NextResponse.json({error: "Unrecognized action"}, {status: 400});
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed organization action";
    return NextResponse.json({error: msg}, {status: 500});
  }
};
