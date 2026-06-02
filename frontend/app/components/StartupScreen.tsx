import { motion, Variants,AnimatePresence } from "framer-motion";

export default function StartupScreen() {
  // Simple animated logo that fades in and out
  const container:Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, transition: { duration: 0.8 } },
  };

  const logo:Variants = {
    hidden: { scale: 0.5, rotate: -30, opacity: 0 },
    visible: { scale: 1, rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
    exit: { scale: 0.5, rotate: 30, opacity: 0, transition: { duration: 0.8 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black z-50"
        variants={container}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.h1
          className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 bg-clip-text text-transparent"
          variants={logo}
        >
          AGENT_FIREWALL
        </motion.h1>
      </motion.div>
    </AnimatePresence>
  );
}
