"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WsLogEntry {
  type: "info" | "success" | "warn" | "error" | "input" | "output";
  timestamp: string;
  sender: string;
  message: string;
}

interface Props {
  wsLogs: WsLogEntry[];
  isConnected: boolean;
  isStreaming: boolean;
}

export default function WebSocketTerminal({ wsLogs, isConnected, isStreaming }: Props) {
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const [binaryGlow, setBinaryGlow] = useState("");

  // Auto scroll terminal logs
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [wsLogs]);

  // Generate glowing floating digital bitstream
  useEffect(() => {
    const interval = setInterval(() => {
      const bits = Array.from({ length: 45 }, () => (Math.random() > 0.5 ? "1" : "0")).join(" ");
      setBinaryGlow(bits);
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const getLogColors = (type: string) => {
    switch (type) {
      case "success": return "text-emerald-400";
      case "warn": return "text-amber-400";
      case "error": return "text-red-400 animate-pulse";
      case "input": return "text-cyan-400";
      case "output": return "text-purple-400";
      default: return "text-zinc-500";
    }
  };

  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 relative overflow-hidden transition-all duration-300 hover:border-zinc-700/80 shadow-xl shadow-black/40 flex flex-col h-[400px]">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Terminal Title & Headers */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
        <div>
          <h3 className="font-extrabold font-mono text-sm tracking-tight text-white flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isStreaming ? "bg-purple-400" : isConnected ? "bg-emerald-400" : "bg-amber-400"
              }`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isStreaming ? "bg-purple-500" : isConnected ? "bg-emerald-500" : "bg-amber-500"
              }`} />
            </span>
            <span>WEBSOCKET LIVE INTERCEPTION TUNNEL</span>
          </h3>
          <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
            Port: <span className="text-cyan-400">8000</span> | Route: <span className="text-cyan-400">/ws/threats</span>
          </p>
        </div>

        <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded border border-zinc-800 bg-zinc-950/80 text-zinc-400">
          {isStreaming ? "STREAMING" : isConnected ? "TUNNEL OPEN" : "SANDBOX TUNNEL"}
        </span>
      </div>

      {/* Interactive Binary Matrix Canvas Overlay */}
      <div className="bg-zinc-950/40 border border-zinc-900 rounded-lg p-2.5 mb-3 font-mono text-[9px] text-cyan-500/20 select-none overflow-hidden h-7 flex items-center leading-none tracking-widest whitespace-nowrap">
        {binaryGlow || "1 0 1 0 0 1 1 0 1 0 1 0 0 1 1 0 1 0 1 0 0 1 1 0 1 0 1 0 0 1 1"}
      </div>

      {/* Command Line Terminal Window */}
      <div className="flex-1 bg-black/90 border border-zinc-850 rounded-xl p-4 font-mono text-xs overflow-y-auto space-y-2.5 shadow-inner custom-scrollbar relative">
        <AnimatePresence initial={false}>
          {wsLogs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-start gap-2 break-all leading-normal"
            >
              <span className="text-zinc-600 text-3xs select-none mt-0.5 shrink-0">[{log.timestamp}]</span>
              <span className={`font-bold shrink-0 ${getLogColors(log.type)}`}>
                {log.sender}:
              </span>
              <span className="text-zinc-300 font-medium">{log.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={terminalEndRef} />
      </div>

      {/* Console Input Placeholder */}
      <div className="mt-3 bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 flex items-center justify-between font-mono text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 animate-pulse">&gt;</span>
          <span>socket_interceptor --active --listen-all</span>
        </div>
        <span className="text-[10px] text-zinc-700">WS-SEC</span>
      </div>
    </div>
  );
}
