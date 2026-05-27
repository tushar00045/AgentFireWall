interface Props {
  filteredLogs: any[];
}

export default function ThreatFeed({
  filteredLogs,
}: Props) {

  return (
    <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <h2 className="text-3xl font-bold mb-6">
        Live Threat Feed
      </h2>

      <div className="space-y-4">

        {filteredLogs.length > 0 ? (

          filteredLogs.map((log, index) => (

            <div
              key={index}
              className="bg-black border border-zinc-700 rounded-xl p-5"
            >

              <div className="flex justify-between items-center mb-3">

                <div
                  className={`font-bold ${
                    log.decision === "BLOCK"
                      ? "text-red-500"
                      : log.decision ===
                        "WARNING"
                      ? "text-yellow-400"
                      : "text-green-500"
                  }`}
                >

                  {log.decision}

                </div>

                <div className="text-zinc-500 text-sm">

                  {log.timestamp}

                </div>

              </div>

              <p className="text-zinc-300 mb-3">

                {log.prompt}

              </p>

              <div className="flex flex-wrap gap-3">

                <div className="bg-zinc-800 px-3 py-1 rounded-lg text-sm">

                  Risk:
                  {" "}
                  {log.risk_score}

                </div>

                <div className="bg-orange-900/30 border border-orange-700 px-3 py-1 rounded-lg text-sm text-orange-400">

                  {log.threat_type}

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="text-zinc-500">
            No threats detected yet.
          </div>

        )}

      </div>
    </div>
  );
}