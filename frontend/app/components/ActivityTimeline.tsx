interface Props {
  logs: any[];
}

export default function ActivityTimeline({
  logs,
}: Props) {

  return (
    <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-3xl font-bold mb-6">Activity Timeline</h2>

      <div className="space-y-6">
        {logs
          .slice()
          .reverse()
          .map((log, index) => (
            <div key={index} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div
                  className={`w-4 h-4 rounded-full ${
                    log.decision === "BLOCK"
                      ? "bg-red-500"
                      : log.decision === "WARNING"
                        ? "bg-yellow-400"
                        : "bg-green-500"
                  }`}
                />

                {index !== logs.length - 1 && (
                  <div className="w-[2px] h-16 bg-zinc-700 mt-1" />
                )}
              </div>

              <div className="flex-1 bg-black border border-zinc-700 rounded-xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <div
                    className={`font-bold ${
                      log.decision === "BLOCK"
                        ? "text-red-500"
                        : log.decision === "WARNING"
                          ? "text-yellow-400"
                          : "text-green-500"
                    }`}
                  >
                    {log.decision}
                  </div>

                  <div className="text-zinc-500 text-sm font-mono">
                    {(() => {
                      try {
                        const d = new Date(log.timestamp);
                        if (isNaN(d.getTime())) return log.timestamp;
                        const day = String(d.getDate()).padStart(2, '0');
                        const month = String(d.getMonth() + 1).padStart(2, '0');
                        const year = d.getFullYear();
                        const hours = String(d.getHours()).padStart(2, '0');
                        const minutes = String(d.getMinutes()).padStart(2, '0');
                        const seconds = String(d.getSeconds()).padStart(2, '0');
                        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
                      } catch (e) {
                        return log.timestamp;
                      }
                    })()}
                    {log.timestamp}
                  </div>
                </div>

                <p className="text-zinc-300 mb-3">{log.prompt}</p>

                <div className="text-orange-400 text-sm">{log.threat_type}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}