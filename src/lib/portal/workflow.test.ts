import {describe, expect, it} from "vitest";

import {canTransition} from "./workflow";

describe("Request workflow state transitions", () => {
  it("allows client member to submit a draft", () => {
    const result = canTransition("draft", "submitted", "client_member");
    expect(result.allowed).toBe(true);
  });

  it("prevents client member from directly scheduling or setting in_progress", () => {
    const resultSchedule = canTransition("submitted", "scheduled", "client_member");
    expect(resultSchedule.allowed).toBe(false);

    const resultProgress = canTransition("submitted", "in_progress", "client_member");
    expect(resultProgress.allowed).toBe(false);
  });

  it("allows client owner to accept estimate transitioning from awaiting_approval to scheduled", () => {
    const result = canTransition("awaiting_approval", "scheduled", "client_owner", true);
    expect(result.allowed).toBe(true);
  });

  it("prevents staff from accepting estimate without client approval action", () => {
    const result = canTransition("awaiting_approval", "scheduled", "staff", false);
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain("authorized client approver");
  });

  it("allows client owner to request revision when ready_for_review", () => {
    const result = canTransition("ready_for_review", "revision_requested", "client_owner");
    expect(result.allowed).toBe(true);
  });

  it("allows client owner to approve deliverable when ready_for_review", () => {
    const result = canTransition("ready_for_review", "completed", "client_owner", true);
    expect(result.allowed).toBe(true);
  });

  it("allows client member to request reopening a completed request", () => {
    const result = canTransition("completed", "in_review", "client_member");
    expect(result.allowed).toBe(true);
  });

  it("allows staff to transition from submitted to in_review and in_progress", () => {
    const triage = canTransition("submitted", "in_review", "staff");
    expect(triage.allowed).toBe(true);

    const progress = canTransition("in_review", "in_progress", "staff");
    expect(progress.allowed).toBe(true);
  });

  it("allows staff to mark in_progress as ready_for_review", () => {
    const review = canTransition("in_progress", "ready_for_review", "staff");
    expect(review.allowed).toBe(true);
  });

  it("blocks impossible or illegal state transitions", () => {
    const invalid = canTransition("draft", "completed", "studio_admin");
    expect(invalid.allowed).toBe(false);

    const backwards = canTransition("in_progress", "submitted", "staff");
    expect(backwards.allowed).toBe(false);
  });
});
