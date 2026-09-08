import React from "react";

export type SectionNumberProps = {
  number: string;
  label?: string;
  dark?: boolean;
  className?: string;
};

export function SectionNumber({number, label, dark = false, className = ""}: SectionNumberProps) {
  return (
    <div className={`inline-flex items-center gap-2 font-display text-xs font-semibold tracking-[0.2em] uppercase ${className}`}>
      <span className={dark ? "text-teal-400" : "text-teal"}>{number}</span>
      {label ? (
        <>
          <span aria-hidden="true" className={dark ? "text-canvas/40" : "text-ink/30"}>/</span>
          <span className={dark ? "text-canvas/80" : "text-ink/70"}>{label}</span>
        </>
      ) : null}
    </div>
  );
}
