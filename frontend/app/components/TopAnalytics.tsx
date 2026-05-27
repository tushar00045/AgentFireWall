interface Props {
  firewallData: any;
  trustScore: number;
  posture: {
    label: string;
    color: string;
  };
}

export default function TopAnalytics({
  firewallData,
  trustScore,
  posture,
}: Props) {

  return (

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

        <p className="text-zinc-400 mb-2">
          Threat Risk Score
        </p>

        <h2 className="text-5xl font-bold text-red-500">

          {firewallData?.risk_score || 0}

        </h2>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

        <p className="text-zinc-400 mb-2">
          Firewall Decision
        </p>

        <h2
          className={`text-4xl font-bold ${
            firewallData?.decision === "BLOCK"
              ? "text-red-500"
              : firewallData?.decision ===
                "WARNING"
              ? "text-yellow-400"
              : "text-green-500"
          }`}
        >

          {firewallData?.decision ||
            "WAITING"}

        </h2>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

        <p className="text-zinc-400 mb-2">
          Threat Classification
        </p>

        <h2 className="text-3xl font-bold text-orange-400">

          {firewallData?.llm_analysis
            ?.threat_type || "No Threat"}

        </h2>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

        <p className="text-zinc-400 mb-2">
          Trust Score
        </p>

        <h2
          className={`text-4xl font-bold ${posture.color}`}
        >
          {trustScore}

        </h2>
        <p
          className={`mt-2 font-semibold ${posture.color}`}
        >
          {posture.label}
        </p>
      </div>
    </div>
  );
}