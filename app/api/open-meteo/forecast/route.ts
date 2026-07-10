import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");

  if (!latitude || !longitude) {
    return NextResponse.json({ error: "latitude and longitude are required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&forecast_days=5&daily=temperature_2m_max,temperature_2m_min,weather_code`,
      {
        headers: { Accept: "application/json" },
      },
    );

    if (res.status === 404) {
      return NextResponse.json({ error: "City not found!" }, { status: 404 });
    }

    if (!res.ok) {
      return NextResponse.json({ error: `Weather API error: ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Network error while contacting Weather Forecast API" }, { status: 502 });
  }
}
