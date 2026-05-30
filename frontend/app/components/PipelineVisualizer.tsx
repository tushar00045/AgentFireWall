"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Node {
  id: number;
  label: string;
  subLabel: string;
  description: string;
  status: "active" | "secured" | "idle";
  techStack: string;
  color: string;
  icon: string;
}

export default function PipelineVisualizer() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const pipelineNodes: Node[] = [
    {
      id: 0,
      label: "Runtime Interceptor",
      subLabel: "Prompt Grabber",
      description: "Hooks into agent system prompt events, freezing the pipeline before the LLM processes or acts on unverified text inputs.",
      status: "active",
      techStack: "FastAPI Middleware",
      color: "border-cyan-500 text-cyan-400 bg-cyan-950/20",
      icon: "📥",
    },
    {
      id: 1,
      label: "Threat scoring AI",
      subLabel: "Injection Classification",
      description: "A semantic and rule-based detector scanning prompt embeddings for adversarial prompts, jailbreaks, or hidden instructions.",
      status: "secured",
      techStack: "Gemini Pro / LLM Scanners",
      color: "border-purple-500 text-purple-400 bg-purple-950/20",
      icon: "🧠",
    },
    {
      id: 2,
      label: "LangGraph Security Flow",
      subLabel: "Multi-Agent Check",
      description: "Coordinates complex safety evaluation logic utilizing consensus graphs to analyze prompts across diverse classification nodes.",
      status: "secured",
      techStack: "LangGraph Orchestration",
      color: "border-emerald-500 text-emerald-400 bg-emerald-950/20",
      icon: "🕸️",
    },
    {
      id: 3,
      label: "Tool Governance Engine",
      subLabel: "Policy Enforcement",
      description: "Enforces fine-grained schemas, blocking hazardous commands like DB drops or secrets reads, allowing harmless ones.",
      status: "secured",
      techStack: "Role-Based Tool Policies",
      color: "border-amber-500 text-amber-400 bg-amber-950/20",
      icon: "🛡️",
    },
    {
      id: 4,
      label: "Protected Execution",
      subLabel: "Runtime Delivery",
      description: "Delivers safe data to client endpoints or logs block actions into the immutable database system for audit compliance.",
      status: "secured",
      techStack: "SQLite Logs / Output Gate",
      color: "border-rose-500 text-rose-400 bg-rose-950/20",
      icon: "🚀",
    },
  ];

  return (
    <div className="mt-12 bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <span className="text-purple-400 font-semibold uppercase tracking-wider text-sm">Security Pipeline</span>
          <h2 className="text-4xl font-extrabold text-white mt-1">LangGraph Orchestration Flow</h2>
          <p className="text-zinc-400 mt-2 max-w-xl">
            Click on any node in the orchestration diagram below to inspect the detailed security validation processes and technologies.
          </p>
        </div>
        <div className="bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-2 flex items-center gap-3">
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((step) => (
              <button
                key={step}
                onClick={() => setActiveStep(step)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeStep === step ? "bg-purple-500 scale-125 shadow-md shadow-purple-500/50" : "bg-zinc-800 hover:bg-zinc-700"
                }`}
              />
            ))}
          </div>
          <span className="text-zinc-500 text-xs font-mono">Steps 1-5</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Horizontal Node Connectors */}
        <div className="lg:col-span-5 flex flex-col md:flex-row items-center justify-between gap-6 relative md:pb-6 border-b border-zinc-800/60">
          {pipelineNodes.map((node, index) => {
            const isSelected = activeStep === index;
            return (
              <div key={node.id} className="w-full flex-1 flex flex-col items-center relative z-10">
                <button
                  onClick={() => setActiveStep(index)}
                  className={`w-full max-w-[200px] flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 relative group cursor-pointer ${
                    isSelected 
                      ? `${node.color} scale-105 shadow-xl shadow-purple-500/5` 
                      : "bg-zinc-950/40 border-zinc-800/80 hover:bg-zinc-800/20 hover:border-zinc-700 text-zinc-400"
                  }`}
                >
                  <span className="text-3xl mb-2">{node.icon}</span>
                  <span className={`text-xs font-mono font-bold tracking-wider ${isSelected ? "text-white" : "text-zinc-500"}`}>
                    STEP 0{index + 1}
                  </span>
                  <h4 className="font-bold text-white text-sm mt-1 text-center font-sans tracking-tight leading-tight">
                    {node.label}
                  </h4>
                  <p className="text-[10px] text-zinc-500 mt-1 font-mono">{node.subLabel}</p>

                  {/* Pulsing selection circle */}
                  {isSelected && (
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
                      <span className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </button>

                {/* Animated connectors */}
                {index < 4 && (
                  <div className="hidden md:block absolute top-[40%] right-[-50%] w-full h-[2px] bg-zinc-800 pointer-events-none -z-10">
                    <motion.div
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        ease: "linear",
                        delay: index * 0.5,
                      }}
                      className="w-16 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Detailed Node Information Screen */}
        <div className="lg:col-span-5 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-6 relative min-h-[160px] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{pipelineNodes[activeStep].icon}</span>
              <div>
                <span className="text-[10px] font-bold font-mono tracking-widest text-cyan-400 uppercase">
                  Security Pipeline Stage 0{activeStep + 1}
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-0.5">
                  {pipelineNodes[activeStep].label}
                </h3>
              </div>
            </div>
            <p className="text-zinc-400 text-sm mt-4 leading-relaxed">
              {pipelineNodes[activeStep].description}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 min-w-[220px] w-full md:w-auto font-mono text-xs">
            <span className="text-zinc-500 uppercase tracking-wider block mb-2 font-bold text-[10px]">Technology Stack</span>
            <span className="text-cyan-400 font-semibold text-sm block mb-3">
              {pipelineNodes[activeStep].techStack}
            </span>
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>Secured Layer Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
