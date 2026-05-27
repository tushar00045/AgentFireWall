interface Props {
  threatStats: any;
}

export default function ThreatHeatmap({
  threatStats,
}: Props) {

  return (
    <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <h2 className="text-3xl font-bold mb-6">
        Threat Heatmap
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-red-900/20 border border-red-700 rounded-xl p-5">

          <p className="text-zinc-400 mb-2">
            Prompt Injection
          </p>

          <h2 className="text-4xl font-bold text-red-500">

            {threatStats.promptInjection}

          </h2>

        </div>

        <div className="bg-yellow-900/20 border border-yellow-700 rounded-xl p-5">

          <p className="text-zinc-400 mb-2">
            Jailbreak
          </p>

          <h2 className="text-4xl font-bold text-yellow-400">

            {threatStats.jailbreak}

          </h2>

        </div>

        <div className="bg-pink-900/20 border border-pink-700 rounded-xl p-5">

          <p className="text-zinc-400 mb-2">
            Tool Hijacking
          </p>

          <h2 className="text-4xl font-bold text-pink-400">

            {threatStats.toolHijacking}

          </h2>
        </div>
      </div>
    </div>
  );
}