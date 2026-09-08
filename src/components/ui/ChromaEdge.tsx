import React from "react";

export type ChromaEdgeProps = {
  className?: string;
  position?: "top-right" | "bottom-left";
  dark?: boolean;
};

export function ChromaEdge({className = "", position = "top-right", dark = false}: ChromaEdgeProps) {
  const isTopRight = position === "top-right";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 size-12 sm:size-16 ${
        isTopRight ? "top-0 right-0" : "bottom-0 left-0"
      } ${className}`}
    >
      {/* Outer Line (Indigo) */}
      <div
        className={`absolute inset-0 border-[1.5px] ${
          isTopRight
            ? "border-b-0 border-l-0 rounded-tr-xl"
            : "border-t-0 border-r-0 rounded-bl-xl"
        } ${dark ? "border-indigo-400" : "border-indigo"}`}
      />

      {/* Inner Line (Teal) with 4px inset */}
      <div
        className={`absolute inset-1 border-[1.5px] ${
          isTopRight
            ? "border-b-0 border-l-0 rounded-tr-lg"
            : "border-t-0 border-r-0 rounded-bl-lg"
        } ${dark ? "border-teal-400" : "border-teal"}`}
      />
    </div>
  );
}
