import React from "react";

import type {RequestEvent} from "@/lib/portal/types";

export const RequestTimeline: React.FC<{events: RequestEvent[]}> = ({events}) => {
  if (events.length === 0) {
    return (
      <p className="text-xs text-ink/50 italic py-2">No history recorded yet.</p>
    );
  }

  return (
    <ol aria-label="Request status timeline" className="relative border-l border-ink/20 ml-2 space-y-6">
      {events.map((evt) => {
        const dateFormatted = new Date(evt.timestamp).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        });

        let dotColor = "bg-ink/30 border-canvas";
        if (evt.eventType === "created") dotColor = "bg-teal border-canvas";
        else if (evt.eventType === "status_changed") dotColor = "bg-indigo border-canvas";
        else if (evt.eventType === "estimate_approved") dotColor = "bg-emerald-600 border-canvas";
        else if (evt.eventType === "estimate_rejected") dotColor = "bg-red-500 border-canvas";
        else if (evt.eventType === "deliverable_published") dotColor = "bg-purple-600 border-canvas";
        else if (evt.eventType === "deliverable_approved") dotColor = "bg-green-600 border-canvas";

        return (
          <li className="ml-5 relative" key={evt.id}>
            <span
              aria-hidden="true"
              className={`absolute -left-[27px] top-1 size-3 rounded-full border-2 ${dotColor}`}
            />
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-xs font-semibold text-ink">{evt.actorName}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-ink/40">
                {evt.actorRole.replace("_", " ")}
              </span>
              <time className="text-[11px] text-ink/50 ml-auto" dateTime={evt.timestamp}>
                {dateFormatted}
              </time>
            </div>
            <p className="text-xs text-ink/80 mt-1 leading-relaxed">{evt.description}</p>
          </li>
        );
      })}
    </ol>
  );
};
