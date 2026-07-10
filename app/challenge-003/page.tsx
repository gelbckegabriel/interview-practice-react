"use client";

import Link from "next/link";
import { useState } from "react";

interface ICities {
  name: string;
  region: string;
  country: string;
  countryCode: string;
  population: number;
  latitude: number;
  longitude: number;
  timezone: string;
}

export default function Challenge003() {
  const [city, setCity] = useState<string>("");
  const [apiCities, setApiCities] = useState<ICities[]>([]);

  const getCityCoordinates = (city: string) => {
    fetch(`api/open-meteo/coordinates/${city}`).then(async (response) => {
      const data = await response.json();

      const cities: ICities[] = data.results.map((result: any) => ({
        name: result.name,
        region: result.admin1,
        country: result.country,
        countryCode: result.country_code,
        population: result.population,
        latitude: result.latitude,
        longitude: result.longitude,
        timezone: result.timezone,
      }));

      setApiCities(cities);
    });
  };

  const getCityForecast = (latitude: number, longitude: number, timezone: string) => {
    console.log(`City: ${city} | latitude: ${latitude} | longitude: ${longitude} | timezone: ${timezone}`);
    fetch(`api/open-meteo/forecast?latitude=${latitude}&longitude=${longitude}`).then(async (response) => {
      const data = await response.json();
      console.log(data);
    });
  };

  return (
    <>
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 py-16 font-sans">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 mb-8 inline-block">
            ← Back to challenges
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-sm text-zinc-400">#003</span>
            <span className="text-xs rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2.5 py-1">
              Fullstack
            </span>
            <span className="text-xs rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 px-2.5 py-1">
              Intermediate
            </span>
          </div>

          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">Weather Forecast Dashboard</h1>

          {/* Challenge */}
          <details className="group mb-12 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" open>
            <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-zinc-700 dark:text-zinc-300 select-none [&::-webkit-details-marker]:hidden">
              <span>Challenge Brief</span>
              <svg
                className="h-4 w-4 text-zinc-400 transition-transform group-open:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </summary>

            <section className="px-5 pb-6 border-t border-zinc-100 dark:border-zinc-800 space-y-8 text-sm leading-7 pt-6">
              <div>
                <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-3">Context</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  A travel-planning startup wants a small internal dashboard so employees can check the current weather and an
                  upcoming forecast for any city in the world. Ops does not want to manage API keys or secrets for an internal
                  tool, so this must run against a free, keyless public weather API.
                </p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-3">Requirements</h2>
                <ol className="list-decimal list-outside ml-5 space-y-3 text-zinc-600 dark:text-zinc-400">
                  <li>
                    Provide a <strong>search input</strong> for a city name. Resolve the name to coordinates using the{" "}
                    <strong>Open-Meteo Geocoding API</strong>. If the search matches more than one place (e.g. &ldquo;Paris&rdquo;
                    matches several countries), show a <strong>disambiguation list</strong> (name, region, country) and let the
                    user pick one.
                  </li>
                  <li>
                    Once a location is chosen, fetch <strong>current conditions</strong> and a{" "}
                    <strong>forecast covering at least the next 5 days</strong> from the <strong>Open-Meteo Forecast API</strong>.
                  </li>
                  <li>
                    Display current conditions prominently: temperature, &ldquo;feels like&rdquo; (apparent) temperature, wind
                    speed, and a human-readable condition description. Open-Meteo returns a numeric weather code &mdash; you must
                    map codes to descriptions (and/or icons) yourself.
                  </li>
                  <li>
                    Display the multi-day forecast as a list or row of day cards, each showing the min/max temperature,
                    precipitation probability, and condition.
                  </li>
                  <li>
                    All requests to Open-Meteo must go through a <strong>Next.js Route Handler</strong>. The client must never
                    call Open-Meteo directly.
                  </li>
                  <li>
                    Implement your <strong>own in-memory server-side cache with a TTL</strong> (e.g. 10 minutes), keyed by
                    location, so that repeated searches for the same city do not re-hit Open-Meteo. The cache must expire entries
                    correctly.
                  </li>
                  <li>
                    Handle distinct <strong>error states</strong>: no geocoding match found, upstream API failure/timeout, and
                    generic network failure.
                  </li>
                  <li>
                    Show <strong>loading indicators</strong> for the geocoding step and the forecast step separately &mdash; they
                    are two sequential network calls.
                  </li>
                </ol>
              </div>

              <div>
                <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-3">Constraints</h2>
                <ul className="list-disc list-outside ml-5 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>
                    No third-party data-fetching libraries (no SWR, React Query, Axios, etc.). Use the native <code>fetch</code>{" "}
                    API.
                  </li>
                  <li>No API key of any kind &mdash; use only Open-Meteo&rsquo;s free, keyless endpoints.</li>
                  <li>No UI component libraries. Tailwind CSS is already installed and available.</li>
                  <li>TypeScript is required. Type only the response fields you actually consume.</li>
                  <li>
                    The cache must be your own hand-rolled logic (e.g. a module-level <code>Map</code> plus timestamps) &mdash;
                    not Next.js&rsquo;s built-in fetch cache or the <code>use cache</code> directive. The point of this exercise
                    is to practice writing your own expiry logic.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-3">Expected Outcome</h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-3">
                  A working page at <code>/challenge-003</code> (this page, which you will replace with your implementation) that
                  satisfies all requirements above. The evaluator will:
                </p>
                <ul className="list-disc list-outside ml-5 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>
                    Search for a real city (e.g. <code>Toronto</code>) and verify current conditions and the forecast look
                    plausible.
                  </li>
                  <li>
                    Search an ambiguous name (e.g. <code>Paris</code> or <code>London</code>) and confirm a disambiguation list
                    with multiple countries appears.
                  </li>
                  <li>Search a nonsense string and confirm a clean &ldquo;not found&rdquo; message, with no crash.</li>
                  <li>
                    Search the same city twice within the TTL window and confirm (via the Network tab, or a cache indicator you
                    add) that the second search does not re-hit Open-Meteo.
                  </li>
                  <li>Inspect the Network tab to confirm all Open-Meteo calls originate from the server, not the browser.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-3">Bonus (optional)</h2>
                <ul className="list-disc list-outside ml-5 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>Celsius / Fahrenheit toggle.</li>
                  <li>
                    A &ldquo;use my location&rdquo; button using the browser Geolocation API, reverse-geocoded through Open-Meteo.
                  </li>
                  <li>Clicking a forecast day expands an hourly breakdown for that day.</li>
                  <li>A visible &ldquo;served from cache&rdquo; vs &ldquo;fresh&rdquo; badge on the current conditions card.</li>
                </ul>
              </div>

              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  Useful starting points (no answers here, just doors): <strong>Open-Meteo docs</strong> &rarr;{" "}
                  <code>open-meteo.com/en/docs</code> and <code>open-meteo.com/en/docs/geocoding-api</code> (free, no key
                  required) &nbsp;|&nbsp; <strong>Next.js docs</strong> &rarr; Route Handlers, Route Segment Config &nbsp;|&nbsp;{" "}
                  <strong>MDN</strong> &rarr; <code>Map</code>, <code>Date.now</code>, <code>AbortController</code>,{" "}
                  <code>Navigator.geolocation</code>
                </p>
              </div>
            </section>
          </details>

          {/* Solution */}
          <div className="mb-12 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 p-10 text-center">
            {/* Search Bar */}
            <div className="flex gap-4 w-full items-center justify-center">
              <input
                className="w-[80%] text-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/30 rounded-md"
                type="text"
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    getCityCoordinates(city);
                  }
                }}
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors hover:cursor-pointer"
                onClick={() => getCityCoordinates(city)}
              >
                Search
              </button>
            </div>

            {/* Cities Found */}
            <div className="my-8 flex flex-col gap-4">
              {apiCities != null && (
                <>
                  {apiCities.map((city, index) => (
                    <div
                      key={`${city.countryCode}-${city.region}-${index}`}
                      className="flex gap-4 w-full p-4 bg-white/10 rounded-lg hover:scale-105 transition-all duration-200 cursor-pointer"
                      onClick={() => getCityForecast(city.latitude, city.longitude, city.timezone)}
                    >
                      <img src={`https://flagsapi.com/${city.countryCode}/flat/64.png`} className="rounded-[50%]" />
                      <div className="flex flex-col items-baseline ">
                        <span className="text-lg text-zinc-200 dark:text-zinc-300 -mb-1">
                          {city.name}, {city.region}
                        </span>
                        <span className="text-md text-zinc-300 dark:text-zinc-400">{city.country}</span>
                        <span className="text-xs text-zinc-400 dark:text-zinc-500">
                          Population: {city.population === undefined ? "???" : city.population}
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
