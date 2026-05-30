interface AgentMetricsProps{
  agentMetrics: Record<string, number>;
}

export default function AgentMetrics({ agentMetrics }: AgentMetricsProps) {

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-3xl font-bold mb-6">Agent Performance Metrics</h2>

      <div className="space-y-4">
        {Object.entries(agentMetrics).map(([agent, time]) => (
          <div
            key={agent}
            className="
        flex
        justify-between
        items-center
        bg-black
        border
        border-zinc-700
        rounded-xl
        p-4
      "
          >
            <span className="font-medium">{agent}</span>

            <span
              className="
          text-cyan-400
          font-semibold
        "
            >
              {time} ms
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
