export function getSeverityColor(risk: number) {
  if (risk >= 80) {
    return "text-red-500";
  }
  if (risk >= 50) {
    return "text-yellow-400";
  }
  return "text-green-500";
}

export function calculateTrustScore(logs: any[]) {
  if (logs.length === 0) {
    return 100;
  }
  const blocked = logs.filter(
    (log) => log.decision === "BLOCK"
  ).length;
  const warning = logs.filter(
    (log) => log.decision === "WARNING"
  ).length;
  return Math.max(
    0,
    100 - (blocked * 15 + warning * 7)
  );
}

export function getSecurityPosture(score: number) {
  if (score >= 80) {
    return {
      label: "TRUSTED",
      color: "text-green-500",
    };
  }
  if (score >= 50) {

    return {
      label: "SUSPICIOUS",
      color: "text-yellow-400",
    };
  }
  return {
    label: "HIGH RISK",
    color: "text-red-500",
  };
}