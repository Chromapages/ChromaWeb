"use client";

import React, {useState} from "react";

import type {InternalNote, PortalSession} from "@/lib/portal/types";
import {PortalButton} from "./PortalButton";

export interface InternalNotesThreadProps {
  notes: InternalNote[];
  session: PortalSession;
  onAddNote: (body: string) => Promise<void>;
}

export const InternalNotesThread: React.FC<InternalNotesThreadProps> = ({
  notes,
  session,
  onAddNote,
}) => {
  const [noteText, setNoteText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!session.isStaff && !session.isStudioAdmin) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      await onAddNote(noteText.trim());
      setNoteText("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to post internal note";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      void handleSubmit(e);
    }
  };

  return (
    <div className="rounded-xl border border-amber-300 bg-amber-50/70 p-5 space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-amber-200">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="text-amber-800 font-bold">
            🔒
          </span>
          <h4 className="font-display text-sm font-bold text-amber-950">
            Internal Staff Notes
          </h4>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-200 text-amber-900 border border-amber-300">
          Staff Only &bull; Hidden from Client
        </span>
      </div>

      <div
        aria-label="Staff internal notes stream"
        className="space-y-3 max-h-[350px] overflow-y-auto pr-1"
        role="log"
      >
        {notes.length === 0 ? (
          <p className="text-xs text-amber-800/70 italic py-2">
            No internal notes recorded. Use this space for private technical coordination, triage observations, or staging links.
          </p>
        ) : (
          notes.map((note) => {
            const dateStr = new Date(note.createdAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            });

            return (
              <div
                className="bg-white/80 border border-amber-200 rounded-lg p-3 text-xs text-ink space-y-1"
                key={note.id}
              >
                <div className="flex items-center justify-between text-[11px] text-amber-900 font-semibold">
                  <span>{note.authorName}</span>
                  <time className="text-amber-800/60 font-normal" dateTime={note.createdAt}>
                    {dateStr}
                  </time>
                </div>
                <p className="text-ink/85 whitespace-pre-wrap leading-relaxed">{note.body}</p>
              </div>
            );
          })
        )}
      </div>

      <form className="pt-2 border-t border-amber-200" onSubmit={handleSubmit}>
        <label className="block text-xs font-semibold text-amber-950 mb-1" htmlFor="internal-note-textarea">
          Add an internal note
        </label>
        <textarea
          aria-label="Write an internal note"
          className="w-full min-h-[70px] p-2.5 text-xs rounded-lg border border-amber-300 bg-white text-ink placeholder:text-amber-800/40 focus:border-indigo focus:ring-1 focus:ring-indigo focus-visible:outline-hidden"
          disabled={isSubmitting}
          id="internal-note-textarea"
          onChange={(e) => setNoteText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Private staff thoughts, estimates rationale, reproduction details..."
          rows={2}
          value={noteText}
        />

        {errorMsg ? (
          <p className="text-xs text-red-600 font-medium mt-1">{errorMsg}</p>
        ) : null}

        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] text-amber-800/60">
            Never visible to client users
          </span>
          <PortalButton
            disabled={!noteText.trim() || isSubmitting}
            isLoading={isSubmitting}
            size="sm"
            type="submit"
            variant="secondary"
          >
            Add Note
          </PortalButton>
        </div>
      </form>
    </div>
  );
};
