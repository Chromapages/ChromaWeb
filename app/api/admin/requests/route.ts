import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidSessionToken, SESSION_COOKIE } from "@/lib/admin-session";

const LINEAR_TEAM_ID = process.env.LINEAR_TEAM_ID || "b31821ff-cff5-4992-99ac-69526a9e203c";

export const GET = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);

  if (!isValidSessionToken(session?.value)) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  const apiKey = process.env.LINEAR_API_KEY;
  if (!apiKey) {
    console.error("LINEAR_API_KEY env var is not set.");
    return NextResponse.json(
      { success: false, message: "Linear integration not configured on server." },
      { status: 500 }
    );
  }

  const query = `
    query ListPortalIssues($teamId: ID!) {
      issues(
        filter: {
          team: { id: { eq: $teamId } }
          or: [
            { labels: { name: { startsWith: "intake/" } } }
            { labels: { name: { startsWith: "cmd/" } } }
          ]
        }
        orderBy: updatedAt
        first: 50
      ) {
        nodes {
          id
          identifier
          title
          description
          createdAt
          updatedAt
          state { id name type }
          labels {
            nodes { id name color }
          }
          comments(first: 10) {
            nodes {
              id
              body
              createdAt
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.linear.app/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": apiKey,
      },
      body: JSON.stringify({
        query,
        variables: { teamId: LINEAR_TEAM_ID },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Linear API returned error:", errorText);
      return NextResponse.json(
        { success: false, message: "Failed to query Linear API." },
        { status: 502 }
      );
    }

    const body = await response.json();
    if (body.errors) {
      console.error("Linear GraphQL errors:", body.errors);
      return NextResponse.json(
        { success: false, message: "Linear GraphQL error." },
        { status: 502 }
      );
    }

    const issues = body.data.issues.nodes || [];
    return NextResponse.json({ success: true, issues });
  } catch (error) {
    console.error("Error querying Linear API:", error);
    return NextResponse.json(
      { success: false, message: "Network error when contacting Linear." },
      { status: 500 }
    );
  }
};
