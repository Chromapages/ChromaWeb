export const proofSignalTypes = [
  {value: "business-outcome", label: "Business outcome", rank: 1},
  {value: "client-evidence", label: "Client evidence", rank: 2},
  {value: "technical-proof", label: "Technical proof", rank: 3},
  {value: "process-proof", label: "Process proof", rank: 4},
  {value: "craft-proof", label: "Craft proof", rank: 5},
] as const;

export type ProofSignalType = (typeof proofSignalTypes)[number]["value"];

export type ProofSignal = {
  type?: string | null;
  statement?: string | null;
  sourceContext?: string | null;
  timeframe?: string | null;
  measurementContext?: string | null;
  limitations?: string | null;
};

function hasText(value: string | null | undefined) {
  return Boolean(value?.trim());
}

export function isProofSignalType(value: unknown): value is ProofSignalType {
  return typeof value === "string" && proofSignalTypes.some((proofSignal) => proofSignal.value === value);
}

export function getProofSignalType(value: string | null | undefined) {
  return proofSignalTypes.find((proofSignal) => proofSignal.value === value);
}

export function normalizeProofSignals(signals: ProofSignal[] | null | undefined) {
  return (signals ?? [])
    .filter((signal) => isProofSignalType(signal.type) && hasText(signal.statement) && hasText(signal.sourceContext) && hasText(signal.timeframe) && hasText(signal.measurementContext) && hasText(signal.limitations))
    .sort((left, right) => getProofSignalType(left.type)!.rank - getProofSignalType(right.type)!.rank);
}

export function selectPrimaryProofSignal(signals: ProofSignal[] | null | undefined) {
  return normalizeProofSignals(signals)[0] ?? null;
}
