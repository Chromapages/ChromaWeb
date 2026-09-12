"use client";

import React, {useState} from "react";

import type {PortalSession, RequestMessage} from "@/lib/portal/types";
import {PortalButton} from "./PortalButton";

export interface PublicConversationProps {
  messages: RequestMessage[];
  session: PortalSession;
  onSendMessage: (body: string) => Promise<void>;
}

export const PublicConversation: React.FC<PublicConversationProps> = ({
  messages,
  session,
  onSendMessage,
}) => {
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      await onSendMessage(replyText.trim());
      setReplyText("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send message";
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
    <div className="space-y-6">
      {/* Message List */}
      <div
        aria-label="Public message thread"
        className="space-y-4 max-h-[500px] overflow-y-auto pr-1"
        role="log"
      >
        {messages.length === 0 ? (
          <p className="text-xs text-ink/50 italic py-4 text-center">
            No public messages yet. Use the box below to ask questions or share updates.
          </p>
        ) : (
          messages.map((msg) => {
            const isMe = msg.authorId === session.uid;
            const isStaffAuthor = msg.authorRole === "staff" || msg.authorRole === "studio_admin";
            const dateStr = new Date(msg.createdAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            });

            return (
              <div
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                key={msg.id}
              >
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-xs font-semibold text-ink">
                    {msg.authorName} {isMe ? "(You)" : ""}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded ${
                      isStaffAuthor
                        ? "bg-indigo/15 text-indigo border border-indigo/20"
                        : "bg-teal/15 text-teal border border-teal/20"
                    }`}
                  >
                    {isStaffAuthor ? "Studio Staff" : "Client"}
                  </span>
                  <time className="text-[11px] text-ink/40" dateTime={msg.createdAt}>
                    {dateStr}
                  </time>
                </div>

                <div
                  className={`p-4 rounded-xl text-sm leading-relaxed max-w-[85%] whitespace-pre-wrap ${
                    isMe
                      ? "bg-teal/10 border border-teal/25 text-ink"
                      : isStaffAuthor
                        ? "bg-indigo/5 border border-indigo/20 text-ink"
                        : "bg-ink/5 border border-ink/15 text-ink"
                  }`}
                >
                  {msg.body}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Reply Box */}
      <form className="border-t border-ink/10 pt-4" onSubmit={handleSubmit}>
        <label className="block text-xs font-semibold text-ink mb-1.5" htmlFor="reply-textarea">
          Send a public message (visible to {session.isStaff ? "client" : "studio staff"})
        </label>
        <textarea
          aria-label="Write a message"
          className="w-full min-h-[90px] p-3 text-sm rounded-lg border border-ink/20 bg-canvas text-ink placeholder:text-ink/40 focus:border-teal focus:ring-1 focus:ring-teal focus-visible:outline-hidden"
          disabled={isSubmitting}
          id="reply-textarea"
          onChange={(e) => setReplyText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message or response... (Cmd/Ctrl + Enter to send)"
          rows={3}
          value={replyText}
        />

        {errorMsg ? (
          <p className="text-xs text-red-600 font-medium mt-1">{errorMsg}</p>
        ) : null}

        <div className="flex items-center justify-between mt-2.5">
          <span className="text-[11px] text-ink/50">
            Press Cmd/Ctrl + Enter to submit
          </span>
          <PortalButton
            disabled={!replyText.trim() || isSubmitting}
            isLoading={isSubmitting}
            size="sm"
            type="submit"
            variant="primary"
          >
            Send Message
          </PortalButton>
        </div>
      </form>
    </div>
  );
};
