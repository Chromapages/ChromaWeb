import React from "react";
import {ChromaEdge} from "./ChromaEdge";

export type ProofClassification =
  | "real-public-client"
  | "confidential-client"
  | "white-label"
  | "concept-study"
  | "internal-prototype"
  | "owned-brand";

export const CLASSIFICATION_LABELS: Record<ProofClassification, string> = {
  "real-public-client": "Public Client Work",
  "confidential-client": "Confidential Client",
  "white-label": "White-Label Studio Delivery",
  "concept-study": "Concept Study & Previs",
  "internal-prototype": "Internal Prototype",
  "owned-brand": "Owned Brand Systems",
};

export type ProofTileProps = {
  metric?: string;
  label: string;
  context: string;
  classification?: ProofClassification;
  timeframe?: string;
  methodology?: string;
  dark?: boolean;
  withChromaEdge?: boolean;
  className?: string;
};

export function ProofTile({
  metric,
  label,
  context,
  classification,
  timeframe,
  methodology,
  dark = false,
  withChromaEdge = false,
  className = "",
}: ProofTileProps) {
  const classificationLabel = classification ? CLASSIFICATION_LABELS[classification] : null;

  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-6 sm:p-8 transition-all ${
        dark
          ? "border-white/15 bg-ink text-canvas shadow-[0_12px_32px_rgba(15,17,21,0.3)]"
          : "border-ink/15 bg-paper text-ink shadow-[0_1px_3px_rgba(15,17,21,0.06)]"
      } ${className}`}
    >
      {withChromaEdge ? <ChromaEdge dark={dark} /> : null}

      <div className="flex flex-wrap items-center justify-between gap-2">
        {classificationLabel ? (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase ${
              dark
                ? "bg-indigo/30 text-indigo-300 border border-indigo-400/30"
                : "bg-indigo/10 text-indigo border border-indigo/20"
            }`}
          >
            {classificationLabel}
          </span>
        ) : null}

        {timeframe ? (
          <span className={`text-xs ${dark ? "text-canvas/60" : "text-ink/60"}`}>
            {timeframe}
          </span>
        ) : null}
      </div>

      {metric ? (
        <div className={`mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl ${dark ? "text-canvas" : "text-ink"}`}>
          {metric}
        </div>
      ) : null}

      <h4 className={`mt-2 font-display text-lg font-semibold ${dark ? "text-canvas/95" : "text-ink"}`}>
        {label}
      </h4>

      <p className={`mt-2 text-sm leading-6 ${dark ? "text-canvas/75" : "text-ink/70"}`}>
        {context}
      </p>

      {methodology ? (
        <div className={`mt-4 border-t pt-3 text-[11px] leading-relaxed ${dark ? "border-white/10 text-canvas/50" : "border-ink/10 text-ink/50"}`}>
          <span className="font-semibold">Methodology:</span> {methodology}
        </div>
      ) : null}
    </div>
  );
}
