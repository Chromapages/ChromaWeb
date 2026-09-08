import {describe, expect, it} from "vitest";

import {normalizeProofSignals, selectPrimaryProofSignal} from "./proofHierarchy";

const technicalProof = {
  type: "technical-proof",
  statement: "A performance review confirmed the release met its documented technical target.",
  sourceContext: "Approved launch review.",
  timeframe: "Release review window.",
  measurementContext: "Documented technical acceptance checks.",
  limitations: "No commercial outcome is claimed.",
};

describe("proof hierarchy", () => {
  it("prioritizes a verified business outcome ahead of every other proof type", () => {
    const primary = selectPrimaryProofSignal([
      technicalProof,
      {
        type: "business-outcome",
        statement: "A verified business result is documented in the approved engagement record.",
        sourceContext: "Approved client reporting period.",
        timeframe: "Approved reporting period.",
        measurementContext: "Client-approved reporting record.",
        limitations: "The result reflects the documented period only.",
      },
    ]);

    expect(primary?.type).toBe("business-outcome");
  });

  it("uses the strongest available technical proof when no outcome is verified", () => {
    const primary = selectPrimaryProofSignal([
      {type: "craft-proof", statement: "The system established a reusable visual language.", sourceContext: "Approved design review.", timeframe: "Design review period.", measurementContext: "Approved design critique record.", limitations: "This is not a measured business result."},
      technicalProof,
    ]);

    expect(primary?.type).toBe("technical-proof");
  });

  it("omits incomplete signals and orders valid signals by the published hierarchy", () => {
    const signals = normalizeProofSignals([
      {type: "business-outcome", statement: "", sourceContext: "Approved report.", timeframe: "Reporting period.", measurementContext: "Approved report methodology.", limitations: "Time-bounded."},
      {type: "process-proof", statement: "The release followed the documented QA protocol.", sourceContext: "Approved delivery record.", timeframe: "Launch period.", measurementContext: "Documented delivery protocol.", limitations: "This does not establish a business result."},
      technicalProof,
    ]);

    expect(signals.map((signal) => signal.type)).toEqual(["technical-proof", "process-proof"]);
  });
});
