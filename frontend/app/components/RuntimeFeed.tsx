import { motion } from "framer-motion"
interface Props {
  toolLogs: any[];
}

export default function RuntimeFeed({
  toolLogs,
}: Props) {

  return (
    <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-3xl font-bold mb-6">Runtime Action Feed</h2>

      <div className="space-y-4">
        {toolLogs.length > 0 ? (
          toolLogs.map((log, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.2,
              }}
              whileHover={{
                scale: 1.03,
              }}
              className="bg-black border border-zinc-700 rounded-xl p-5"
            >
              <div className="flex justify-between items-center mb-3">
                <div
                  className={`font-bold ${
                    log.status === "BLOCKED" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {log.status}
                </div>

                <div className="text-zinc-500 text-sm">{log.timestamp}</div>
              </div>

              <p className="text-cyan-400 font-semibold mb-2">
                Tool: {log.tool}
              </p>

              <p className="text-zinc-300">{log.message}</p>
            </motion.div>
          ))
        ) : (
          <div className="text-zinc-500">No runtime activity yet.</div>
        )}
      </div>
    </div>
  );
}