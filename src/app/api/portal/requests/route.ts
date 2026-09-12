import {NextResponse} from "next/server";

import {getCurrentSession} from "@/lib/portal/auth";
import {
  createRequest,
  getAllRequestsForStaff,
  getRequests,
  type CreateRequestInput,
  type RequestFilters,
} from "@/lib/portal/dataStore";

export const GET = async (request: Request): Promise<NextResponse> => {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({error: "Unauthenticated"}, {status: 401});
  }

  const {searchParams} = new URL(request.url);
  const isStaffWorkspace = searchParams.get("view") === "admin" && (session.isStaff || session.isStudioAdmin);

  const filters: RequestFilters & {organizationId?: string} = {
    projectId: searchParams.get("projectId") || undefined,
    status: (searchParams.get("status") as RequestFilters["status"]) || undefined,
    category: (searchParams.get("category") as RequestFilters["category"]) || undefined,
    priority: (searchParams.get("priority") as RequestFilters["priority"]) || undefined,
    assigneeId: searchParams.get("assigneeId") || undefined,
    searchQuery: searchParams.get("q") || undefined,
    organizationId: searchParams.get("orgId") || undefined,
  };

  if (isStaffWorkspace) {
    const staffRequests = getAllRequestsForStaff(filters);
    return NextResponse.json({requests: staffRequests});
  }

  // Client view: strictly scoped to current organization
  const clientRequests = getRequests(session.organizationId, filters);
  return NextResponse.json({requests: clientRequests});
};

export const POST = async (request: Request): Promise<NextResponse> => {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({error: "Unauthenticated"}, {status: 401});
  }

  try {
    const body = (await request.json()) as CreateRequestInput & {organizationId?: string};

    if (!body.title || !body.description || !body.projectId || !body.category) {
      return NextResponse.json(
        {error: "Missing required fields: title, description, projectId, and category are required."},
        {status: 400}
      );
    }

    const orgId = session.organizationId;
    const newRequest = createRequest(orgId, body, session);

    return NextResponse.json({success: true, request: newRequest}, {status: 201});
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create request";
    return NextResponse.json({error: msg}, {status: 500});
  }
};
