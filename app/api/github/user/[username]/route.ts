import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: { Accept: "application/vnd.github+json" },
    });

    if (res.status === 404) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    if (!res.ok) {
      return NextResponse.json({ error: `GitHub API error: ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Network error while contacting GitHub" }, { status: 502 });
  }
}
