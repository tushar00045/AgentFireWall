import { motion } from "framer-motion";
interface Props {
  logs: any[];
}

export default function AnalyticsCards({
  logs,
}: Props) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
      >
        <p className="text-zinc-400 mb-2">Total Requests</p>

        <h2 className="text-4xl font-bold">{logs.length}</h2>
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        whileHover={{
          scale: 1.03,
        }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
      >
        <p className="text-zinc-400 mb-2">Blocked Attacks</p>

        <h2 className="text-4xl font-bold text-red-500">
          {logs.filter((log) => log.decision === "BLOCK").length}
        </h2>
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        whileHover={{
          scale: 1.03,
        }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
      >
        <p className="text-zinc-400 mb-2">Safe Requests</p>

        <h2 className="text-4xl font-bold text-green-500">
          {logs.filter((log) => log.decision === "ALLOW").length}
        </h2>
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        whileHover={{
          scale: 1.03,
        }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
      >
        <p className="text-zinc-400 mb-2">Attack Rate</p>

        <h2 className="text-4xl font-bold text-orange-400">
          {logs.length > 0
            ? Math.round(
                (logs.filter((log) => log.decision === "BLOCK").length /
                  logs.length) *
                  100,
              )
            : 0}
          %
        </h2>
      </motion.div>
    </div>
  );
}