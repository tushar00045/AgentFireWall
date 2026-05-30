import {motion} from "framer-motion"
export default function WorkflowVisualization() {
  const nodes = [
    {
      title: "Input Security Agent",
      description: "Input Analysis",
    },

    {
      title: "Threat Classifier",
      description: "Attack Detection",
    },

    {
      title: "Policy Engine",
      description: "Decision Making",
    },

    {
      title: "Runtime Governance",
      description: "Execution Control",
    },
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-3xl font-bold mb-8">Security Workflow</h2>

      <div className="flex flex-col items-center">
        {nodes.map((node, index) => (
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
          >
            <div
              className="
                w-72
                bg-black
                border
                border-cyan-600
                rounded-xl
                p-5
                text-center
              "
            >
              <h3
                className="
                  text-lg
                  font-semibold
                  text-cyan-400
                "
              >
                {node.title}
              </h3>

              <p
                className="
                  text-zinc-400
                  mt-2
                "
              >
                {node.description}
              </p>
            </div>

            {index !== nodes.length - 1 && (
              <div
                className="
                  h-12
                  w-[2px]
                  bg-cyan-500
                "
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
