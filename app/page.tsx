import Link from "next/link";

const challenges = [
  {
    id: "001",
    title: "GitHub User Explorer",
    type: "Fullstack",
    difficulty: "Intermediate",
    href: "/challenge-001",
    completed: true,
  },
  {
    id: "002",
    title: "Kanban Task Board",
    type: "Frontend",
    difficulty: "Intermediate",
    href: "/challenge-002",
    completed: false,
  },
  {
    id: "003",
    title: "Weather Forecast Dashboard",
    type: "Fullstack",
    difficulty: "Intermediate",
    href: "/challenge-003",
    completed: false,
  },
];

const typeStyles: Record<string, string> = {
  Fullstack: "bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400",
  Frontend: "bg-success-50 dark:bg-success-950 text-success-600 dark:text-success-400",
  Backend: "bg-accent-50 dark:bg-accent-950 text-accent-600 dark:text-accent-400",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-ink-50 dark:bg-ink-950 px-6 py-16 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-ink-900 dark:text-ink-50 mb-2">Interview Practice</h1>
        <p className="text-ink-500 dark:text-ink-400 mb-12 text-sm">
          Full-stack challenges for intermediate developers. No spoilers — read the brief, research, build.
        </p>

        <ul className="flex flex-col gap-4">
          {challenges.map((c) => (
            <li key={c.id}>
              <Link
                href={c.href}
                className="flex items-center justify-between rounded-lg border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 px-5 py-4 hover:border-ink-400 dark:hover:border-ink-600 transition-colors"
              >
                <div>
                  <div className="flex gap-8 text-xs font-mono text-ink-400 dark:text-ink-500">
                    <span className="">#{c.id}</span>
                    {c.completed && <span className="filter saturate-200 hue-rotate-180">✔️ Completed</span>}
                  </div>
                  <p className="text-ink-900 dark:text-ink-100 font-medium mt-0.5">{c.title}</p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className={`rounded-full px-2.5 py-1 ${typeStyles[c.type]}`}>{c.type}</span>
                  <span className="rounded-full bg-warning-50 dark:bg-warning-950 text-warning-600 dark:text-warning-400 px-2.5 py-1">
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
