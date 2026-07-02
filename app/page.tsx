import Link from "next/link";

const challenges = [
  {
    id: "001",
    title: "GitHub User Explorer",
    type: "Fullstack",
    difficulty: "Intermediate",
    href: "/challenge-001",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 py-16 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          Interview Practice
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-12 text-sm">
          Full-stack challenges for intermediate developers. No spoilers — read
          the brief, research, build.
        </p>

        <ul className="flex flex-col gap-4">
          {challenges.map((c) => (
            <li key={c.id}>
              <Link
                href={c.href}
                className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-4 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              >
                <div>
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                    #{c.id}
                  </span>
                  <p className="text-zinc-900 dark:text-zinc-100 font-medium mt-0.5">
                    {c.title}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2.5 py-1">
                    {c.type}
                  </span>
                  <span className="rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 px-2.5 py-1">
                    {c.difficulty}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
