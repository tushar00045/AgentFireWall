interface Props {
  reasoningChain: string[];
}
export default function ReasoningChain({ reasoningChain }: Props) {
  return (
    <div
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6
      "
    >
      <h2 className="text-3xl font-bold mb-6">AI Reasoning Chain</h2>

      <div className="space-y-4">
        {reasoningChain.map((reason, index) => (
          <div
            key={index}
            className="
                bg-black
                border
                border-zinc-700
                rounded-xl
                p-4
              "
          >
            <div
              className="
                  text-cyan-400
                  font-semibold
                  mb-2
                "
            >
              Step {index + 1}
            </div>

            <div
              className="
                  text-zinc-300
                "
            >
              {reason}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
