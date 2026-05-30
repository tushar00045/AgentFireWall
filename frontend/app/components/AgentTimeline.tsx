import { motion } from "framer-motion";
interface AgentTimelineProps {
  trace: any[];
}

export default function AgentTimeline({ trace }: AgentTimelineProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-3xl font-bold mb-6">Agent Execution Timeline</h2>

      <div className="space-y-6">
        {trace.map((step, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: index * 0.15,
            }}
            whileHover={{
              scale: 1.03,
            }}
          >
            <div className="flex items-start gap-4">
              <div className="w-5 h-5 rounded-full bg-cyan-500" />
              {index !== trace.length - 1 && (
                <div className="w-[2px] h-16 bg-cyan-500 mt-2" />
              )}
            </div>
            <div className="flex-1 bg-black border border-zinc-700 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-cyan-400">
                {step.agent}
              </h3>
              <p className="text-zinc-300 mt-2">{step.result}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
