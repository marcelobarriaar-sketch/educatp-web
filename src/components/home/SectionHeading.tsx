import type { ReactNode } from "react";
export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div className="max-w-2xl">
        <p
          className={`mb-3 text-xs font-bold uppercase tracking-[.17em] ${light ? "text-emerald-300" : "text-emerald-800"}`}
        >
          {eyebrow}
        </p>
        <h2
          className={`text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl ${light ? "text-white" : "text-slate-950"}`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`mt-3 leading-relaxed ${light ? "text-slate-300" : "text-slate-600"}`}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
