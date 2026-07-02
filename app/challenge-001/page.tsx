"use client";

import { useState } from "react";
import Link from "next/link";

interface IGitHubUser {
  avatar_url: string;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  repos_url: string;
}

interface IGitHubRepo {
  name: string;
  description: string | null;
  language: string;
  stargazers_count: number;
  updated_at: string;
  created_at: string;
}

interface ISortOptions {
  created_at: string;
  updated_at: string;
  least_stars: string;
  most_stars: string;
}

export default function Challenge001() {
  const [username, setUsername] = useState<string>("");
  const [userData, setUserData] = useState<IGitHubUser | null>(null);
  const [repos, setRepos] = useState<IGitHubRepo[]>([]);
  const [sortKey, setSortKey] = useState<keyof ISortOptions>("created_at");
  const [filterText, setFilterText] = useState<string>("");

  const displayedRepos = [...repos]
    .filter((repo) => repo.name.toLowerCase().includes(filterText.toLowerCase()))
    .sort((a, b) => {
      switch (sortKey) {
        case "created_at":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "updated_at":
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        case "least_stars":
          return a.stargazers_count - b.stargazers_count;
        case "most_stars":
          return b.stargazers_count - a.stargazers_count;
        default:
          return 0;
      }
    });

  const handleFindUser = (username: string) => {
    fetch(`/api/github/user/${username}`)
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          alert(`Error: ${response.status} - User Not Found`);
          throw new Error("User not found");
        }

        return data;
      })
      .then((data) => setUserData(data))
      .catch(() => setUserData(null));
  };

  const handleViewRepos = () => {
    fetch(`/api/github/repos/${username}`)
      .then(async (response) => await response.json())
      .then((repos) => setRepos(repos))
      .catch((error) => {
        setRepos([]);
        console.error(error);
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
            <span className="font-mono text-sm text-zinc-400">#001</span>
            <span className="text-xs rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2.5 py-1">
              Fullstack
            </span>
            <span className="text-xs rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 px-2.5 py-1">
              Intermediate
            </span>
          </div>

          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">GitHub User Explorer</h1>

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
                  You are building a small internal tool for a team that wants to look up GitHub profiles and browse a
                  user&rsquo;s public repositories without leaving their intranet. The tool must be fast, handle edge cases
                  gracefully, and not require a GitHub API token (public endpoints only).
                </p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-3">Requirements</h2>
                <ol className="list-decimal list-outside ml-5 space-y-3 text-zinc-600 dark:text-zinc-400">
                  <li>
                    Create a <strong>search input</strong> that accepts a GitHub username. Submitting it should display that
                    user&rsquo;s public profile information: avatar, display name, bio, follower / following counts, and public
                    repository count.
                  </li>
                  <li>
                    Below the profile, display a <strong>list of the user&rsquo;s public repositories</strong>. Each entry must
                    show at minimum: repository name, description (if any), primary language (if any), and star count.
                  </li>
                  <li>
                    The list must be <strong>sortable</strong> by the user&rsquo;s choice of: most stars, least stars, or most
                    recently updated. Sorting must happen without re-fetching from the API.
                  </li>
                  <li>
                    The list must be <strong>filterable</strong> by a free-text search on the repository name.
                  </li>
                  <li>
                    All data fetching must go through a <strong>Next.js Route Handler</strong> (i.e., an{" "}
                    <code>app/api/…/route.ts</code> file). The client must never call the GitHub API directly.
                  </li>
                  <li>
                    Handle and display appropriate <strong>error states</strong>: username not found (404), rate limit exceeded,
                    and generic network failure.
                  </li>
                  <li>
                    Show a <strong>loading indicator</strong> while data is in-flight.
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
                  <li>No UI component libraries. Tailwind CSS is already installed and available.</li>
                  <li>
                    You may use any GitHub REST API v3 public endpoints — no authentication token is required for this challenge.
                  </li>
                  <li>TypeScript is required. All data shapes coming from the API must be typed.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-3">Expected Outcome</h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-3">
                  A working page at <code>/challenge-001</code> (this page, which you will replace with your implementation) that
                  satisfies all requirements above. The evaluator will:
                </p>
                <ul className="list-disc list-outside ml-5 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>
                    Search for a real GitHub user (e.g. <code>torvalds</code>) and verify profile data is accurate.
                  </li>
                  <li>Sort and filter the repository list and confirm the behavior is correct.</li>
                  <li>Search for a non-existent username and verify a clear error message is shown.</li>
                  <li>Inspect the Network tab to confirm all GitHub API calls originate from the server, not the browser.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-3">Bonus (optional)</h2>
                <ul className="list-disc list-outside ml-5 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>
                    Persist the last searched username in the URL as a query parameter so the page is shareable and survives a
                    refresh.
                  </li>
                  <li>
                    Add pagination or infinite scroll if the user has more than 30 repositories (the GitHub API default page
                    size).
                  </li>
                </ul>
              </div>

              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  Useful starting points (no answers here, just doors): <strong>GitHub REST API docs</strong> &rarr; users &amp;
                  repositories endpoints &nbsp;|&nbsp; <strong>Next.js docs</strong> &rarr; Route Handlers, Server vs Client
                  Components &nbsp;|&nbsp; <strong>MDN</strong> &rarr; fetch, AbortController
                </p>
              </div>
            </section>
          </details>

          {/* Solution*/}
          <div className="mb-12">
            {/* Search Input */}
            <div className="flex gap-3 items-center mb-4">
              <input
                className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg px-4 py-2 w-full"
                type="text"
                placeholder="Enter GitHub username..."
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleFindUser(username);
                  }
                }}
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors hover:cursor-pointer"
                onClick={() => handleFindUser(username)}
              >
                Search
              </button>
            </div>

            {/* User Profile */}
            <div>
              {userData && (
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-6">
                    {/* Profile Picture */}
                    <img src={userData.avatar_url} alt={`${userData.name}'s avatar`} className="w-24 h-24 rounded-full mb-4" />

                    {/* User Information */}
                    <div>
                      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{userData.name}</h2>
                      <p className="text-zinc-600 dark:text-zinc-400">{userData.bio}</p>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        Followers: {userData.followers} | Following: {userData.following} | Public Repos: {userData.public_repos}
                      </p>
                      <br />
                      <button
                        className="bg-blue-700 hover:bg-blue-800 text-white font-small py-2 px-4 rounded-lg hover:cursor-pointer"
                        onClick={() => handleViewRepos()}
                      >
                        View Repos
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Repositories */}
            {userData != null && (
              <div className="mt-6">
                <>
                  <div className="flex justify-between my-4">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mt-1">Repositories</h3>

                    {/* Filter */}
                    <input
                      className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg px-4 py-2 w-[50%]"
                      type="text"
                      placeholder="Search by name..."
                      onChange={(e) => setFilterText(e.target.value)}
                    />

                    {/* Sort */}
                    <select
                      className="bg-black cursor-pointer"
                      value={sortKey}
                      onChange={(e) => setSortKey(e.target.value as keyof ISortOptions)}
                    >
                      <option value="created_at">Created</option>
                      <option value="updated_at">Recently Updated</option>
                      <option value="least_stars">Least Stars</option>
                      <option value="most_stars">Most Stars</option>
                    </select>
                  </div>
                  <ul className="space-y-4">
                    {displayedRepos.map((repo) => (
                      <li
                        key={repo.name}
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4"
                      >
                        <h4 className="text-md font-bold text-zinc-900 dark:text-zinc-50">{repo.name}</h4>
                        <p className="text-zinc-600 dark:text-zinc-400">{repo.description}</p>
                        <p className="text-zinc-600 dark:text-zinc-400">Language: {repo.language}</p>
                        <p className="text-zinc-600 dark:text-zinc-400">Stars: {repo.stargazers_count}</p>
                      </li>
                    ))}
                  </ul>
                </>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
