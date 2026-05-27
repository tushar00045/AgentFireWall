interface Props {
  toolResult: any;
}

export default function RuntimeMonitor({
  toolResult,
}: Props) {

  return (

    <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold">
          Runtime Governance
        </h2>

        <div className="flex items-center gap-3">

          <div className="relative">

            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping absolute" />

            <div className="w-3 h-3 bg-red-500 rounded-full relative" />

          </div>

          <div className="text-red-400 font-semibold">
            Monitoring Active
          </div>

        </div>

      </div>

      {toolResult ? (

        <div className="bg-black border border-zinc-700 rounded-xl p-5">

          <div className="flex justify-between items-center mb-4">

            <div className="text-xl font-bold text-cyan-400">

              {toolResult.tool}

            </div>

            <div
              className={`font-bold ${
                toolResult.allowed
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >

              {toolResult.allowed
                ? "ALLOWED"
                : "BLOCKED"}

            </div>

          </div>

          <p className="text-zinc-300 leading-7">

            {toolResult.message}

          </p>

        </div>

      ) : (

        <div className="text-zinc-500">
          No runtime actions yet.
        </div>

      )}

    </div>
  );
}