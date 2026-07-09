import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;

  try {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`, {
      headers: { Accept: "application/json" },
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
