interface AgentStatusPanelProps {
  trace: any[];
}
export default function AgentStatusPanel({ trace }: AgentStatusPanelProps) {
  const agents = [
    "Input Security Agent",
    "Threat Classification Agent",
    "Policy Agent",
    "Runtime Governance Agent",
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-3xl font-bold mb-6">Agent Status</h2>

      <div className="space-y-4">
        {agents.map((agent, index) => {
          const completed = trace.some((step) => step.agent === agent);

          return (
            <div
              key={index}
              className="
                flex
                items-center
                justify-between
                bg-black
                border
                border-zinc-700
                rounded-xl
                p-4
              "
            >
              <span className="font-medium">{agent}</span>

              <div className="flex items-center gap-2">
                <div
                  className={`
                    w-3 h-3 rounded-full
                    ${completed ? "bg-green-500" : "bg-yellow-500"}
                  `}
                />

                <span
                  className={`
                    text-sm
                    ${completed ? "text-green-400" : "text-yellow-400"}
                  `}
                >
                  {completed ? "Completed" : "Waiting"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
