import { ReactNode } from "react";

export function CardComponent({
  width,
  imagePath,
  title,
  children,
}: {
  width: string;
  imagePath: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={`bg-neutral-primary-soft block ${width} p-6 border border-ink-600 rounded-md shadow-xs`}>
      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-ink-300">{title}</h5>
      <div>{children}</div>
    </div>
  );
}
