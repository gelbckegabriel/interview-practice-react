"use client";

import Link from "next/link";

export default function Challenge002() {
  return (
    <>
      <main className="min-h-screen bg-ink-50 dark:bg-ink-950 px-6 py-16 font-sans">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-xs text-ink-400 hover:text-ink-600 dark:hover:text-ink-300 mb-8 inline-block">
            ← Back to challenges
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-sm text-ink-400">#002</span>
            <span className="text-xs rounded-full bg-success-50 dark:bg-success-950 text-success-600 dark:text-success-400 px-2.5 py-1">
              Frontend
            </span>
            <span className="text-xs rounded-full bg-warning-50 dark:bg-warning-950 text-warning-600 dark:text-warning-400 px-2.5 py-1">
              Intermediate
            </span>
          </div>

          <h1 className="text-2xl font-bold text-ink-900 dark:text-ink-50 mb-8">Kanban Task Board</h1>

          {/* Challenge */}
          <details className="group mb-12 rounded-lg border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900" open>
            <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-ink-700 dark:text-ink-300 select-none [&::-webkit-details-marker]:hidden">
              <span>Challenge Brief</span>
              <svg
                className="h-4 w-4 text-ink-400 transition-transform group-open:rotate-180"
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

            <section className="px-5 pb-6 border-t border-ink-100 dark:border-ink-800 space-y-8 text-sm leading-7 pt-6">
              <div>
                <h2 className="text-base font-semibold text-ink-800 dark:text-ink-200 mb-3">Context</h2>
                <p className="text-ink-600 dark:text-ink-400">
                  A small product team wants a lightweight internal task board &mdash; a mini-Trello &mdash; that runs entirely in
                  the browser, with no backend and no accounts. Half the team refuses to use anything that doesn&rsquo;t support
                  dragging cards around, so that&rsquo;s non-negotiable.
                </p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-ink-800 dark:text-ink-200 mb-3">Requirements</h2>
                <ol className="list-decimal list-outside ml-5 space-y-3 text-ink-600 dark:text-ink-400">
                  <li>
                    Render a board with three columns: <strong>To Do</strong>, <strong>In Progress</strong>, and{" "}
                    <strong>Done</strong>.
                  </li>
                  <li>
                    Support <strong>adding a new card</strong> to a chosen column via a form (title required, description
                    optional).
                  </li>
                  <li>
                    Cards must be <strong>draggable between columns</strong>. Dropping a card in a different column moves it
                    there.
                  </li>
                  <li>
                    Cards must also be <strong>reorderable within the same column</strong> by dragging &mdash; not just
                    movable across columns.
                  </li>
                  <li>
                    Each card supports <strong>editing</strong> (title/description) and <strong>deleting</strong>.
                  </li>
                  <li>
                    The entire board must be <strong>persisted to <code>localStorage</code></strong> so a page refresh does not
                    lose any data.
                  </li>
                  <li>Each column header shows a live count of the cards it contains.</li>
                  <li>An empty column must still render as a valid drop target, with a placeholder message.</li>
                </ol>
              </div>

              <div>
                <h2 className="text-base font-semibold text-ink-800 dark:text-ink-200 mb-3">Constraints</h2>
                <ul className="list-disc list-outside ml-5 space-y-2 text-ink-600 dark:text-ink-400">
                  <li>
                    No drag-and-drop library (no <code>react-beautiful-dnd</code>, <code>@dnd-kit/*</code>, etc.). Implement it
                    yourself with the native HTML5 Drag and Drop API or Pointer Events.
                  </li>
                  <li>No external state management library (no Redux, Zustand, Jotai). Stick to React&rsquo;s built-in hooks.</li>
                  <li>No UI component libraries. Tailwind CSS is already installed and available.</li>
                  <li>TypeScript is required. Model the board, column, and card shapes explicitly.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-base font-semibold text-ink-800 dark:text-ink-200 mb-3">Expected Outcome</h2>
                <p className="text-ink-600 dark:text-ink-400 mb-3">
                  A working page at <code>/challenge-002</code> (this page, which you will replace with your implementation)
                  that satisfies all requirements above. The evaluator will:
                </p>
                <ul className="list-disc list-outside ml-5 space-y-2 text-ink-600 dark:text-ink-400">
                  <li>Drag a card from one column to another and confirm it moves and the counts update.</li>
                  <li>Reorder two cards within the same column and confirm the new order sticks.</li>
                  <li>Add, edit, and delete a card, confirming the UI reflects each change immediately.</li>
                  <li>Refresh the page mid-session and confirm the board state (columns, cards, order) is unchanged.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-base font-semibold text-ink-800 dark:text-ink-200 mb-3">Bonus (optional)</h2>
                <ul className="list-disc list-outside ml-5 space-y-2 text-ink-600 dark:text-ink-400">
                  <li>Deleting a card shows an &ldquo;Undo&rdquo; affordance for a few seconds before the delete is final.</li>
                  <li>
                    Provide a keyboard-accessible way to move a card between columns for users who cannot use drag-and-drop.
                  </li>
                  <li>Allow the columns themselves to be reordered via drag-and-drop.</li>
                  <li>Support colored labels/tags on cards.</li>
                </ul>
              </div>

              <div className="border-t border-ink-200 dark:border-ink-800 pt-6">
                <p className="text-xs text-ink-400 dark:text-ink-500">
                  Useful starting points (no answers here, just doors): <strong>MDN</strong> &rarr; HTML Drag and Drop API
                  (<code>dragstart</code>, <code>dragover</code>, <code>drop</code>, <code>DataTransfer</code>) &nbsp;|&nbsp;{" "}
                  <strong>React docs</strong> &rarr; <code>useReducer</code>, <code>useContext</code> &nbsp;|&nbsp;{" "}
                  <strong>MDN</strong> &rarr; <code>localStorage</code>, <code>structuredClone</code>
                </p>
              </div>
            </section>
          </details>

          {/* Solution */}
          <div className="mb-12 rounded-lg border border-dashed border-ink-300 dark:border-ink-700 bg-white/50 dark:bg-ink-900/50 p-10 text-center">
            <p className="text-sm text-ink-500 dark:text-ink-400">
              Replace this section with your implementation.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
