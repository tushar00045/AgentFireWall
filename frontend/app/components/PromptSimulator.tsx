"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  sendPrompt: () => void;
  loading: boolean;
  setAttackPrompt: (type: string) => void;
  loadLogs: () => Promise<void>;
  loadRuntimeLogs: () => Promise<void>;
}

interface GuardedTool {
  name: string;
  category: string;
  status: string;
  policy: string;
  icon: string;
  color: string;
}

const ACTIVE_POLICIES: GuardedTool[] = [
  { name: "delete_database", category: "Destructive", status: "SHIELDED", policy: "Strict Block: Autonomous DB drops are prohibited.", icon: "🔥", color: "text-red-400 border-red-500/20 bg-red-950/10" },
  { name: "read_secrets", category: "Data Access", status: "SHIELDED", policy: "Vault Lock: Credentials exfiltration prohibited.", icon: "🔑", color: "text-orange-400 border-orange-500/20 bg-orange-950/10" },
  { name: "export_customer_data", category: "Exfiltration", status: "SHIELDED", policy: "DLP Shield: Restricts bulk CSV/JSON transfers.", icon: "📦", color: "text-pink-400 border-pink-500/20 bg-pink-950/10" },
  { name: "send_email", category: "Communication", status: "RESTRICTED", policy: "Rate Boundary: Checked for mass communications.", icon: "✉️", color: "text-yellow-400 border-yellow-500/20 bg-yellow-950/10" },
  { name: "get_weather", category: "Utility", status: "SAFE", policy: "Open Access: Normal execution authorized.", icon: "☀️", color: "text-green-400 border-green-500/20 bg-green-950/10" },
];

export default function PromptSimulator({
  prompt,
  setPrompt,
  sendPrompt,
  loading,
  setAttackPrompt,
  loadLogs,
  loadRuntimeLogs,
}: Props) {
  const [activeTab, setActiveTab] = useState<"exploits" | "tools" | "policies">("exploits");

  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-6 mb-8 relative overflow-hidden transition-all duration-300 hover:border-zinc-700/80 shadow-xl shadow-black/40">
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Simulator Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span className="text-cyan-400">⚡</span>
            <span>Security Prompt Simulator</span>
          </h2>
          <p className="text-zinc-500 text-xs mt-1 font-mono">
            Execute adversarial injections or trigger runtime tool policies.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="bg-zinc-950/60 border border-zinc-850 p-1 rounded-xl flex gap-1 font-mono text-xs w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("exploits")}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg font-bold transition-all duration-200 cursor-pointer ${
              activeTab === "exploits" ? "bg-red-500/10 border border-red-500/20 text-red-400" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            💀 EXPLOITS
          </button>
          <button
            onClick={() => setActiveTab("tools")}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg font-bold transition-all duration-200 cursor-pointer ${
              activeTab === "tools" ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            ⚙️ TOOLS
          </button>
          <button
            onClick={() => setActiveTab("policies")}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg font-bold transition-all duration-200 cursor-pointer ${
              activeTab === "policies" ? "bg-purple-500/10 border border-purple-500/20 text-purple-400" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            🛡️ POLICIES
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Console and Action Tabs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <textarea
              className="w-full h-44 bg-zinc-950/90 border border-zinc-800 rounded-2xl p-5 outline-none resize-none text-zinc-200 font-mono text-sm focus:border-cyan-500/40 transition-all duration-300 leading-relaxed shadow-inner"
              placeholder="Inject adversarial prompt or select a security test block below..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            {prompt && (
              <button 
                onClick={() => setPrompt("")}
                className="absolute top-4 right-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-500 hover:text-white rounded-lg p-1.5 text-xs transition-colors font-mono"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Very Creative Cyber Buttons by Tab */}
          <div className="min-h-[110px]">
            {activeTab === "exploits" && (
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => setAttackPrompt("prompt_injection")}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold font-mono border transition-all duration-300 bg-zinc-950/40 border-zinc-800 text-red-400 hover:border-red-500 hover:bg-red-950/15 hover:shadow-[0_0_12px_rgba(239,68,68,0.08)] cursor-pointer active:scale-95"
                >
                  💀 Prompt Injection
                </button>
                <button
                  onClick={() => setAttackPrompt("admin_escalation")}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold font-mono border transition-all duration-300 bg-zinc-950/40 border-zinc-800 text-orange-400 hover:border-orange-500 hover:bg-orange-950/15 hover:shadow-[0_0_12px_rgba(249,115,22,0.08)] cursor-pointer active:scale-95"
                >
                  ⚡ Admin Escalation
                </button>
                <button
                  onClick={() => setAttackPrompt("jailbreak")}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold font-mono border transition-all duration-300 bg-zinc-950/40 border-zinc-800 text-yellow-400 hover:border-yellow-500 hover:bg-yellow-950/15 hover:shadow-[0_0_12px_rgba(234,179,8,0.08)] cursor-pointer active:scale-95"
                >
                  🔓 Jailbreak Exploit
                </button>
                <button
                  onClick={() => setAttackPrompt("system_leak")}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold font-mono border transition-all duration-300 bg-zinc-950/40 border-zinc-800 text-pink-400 hover:border-pink-500 hover:bg-pink-950/15 hover:shadow-[0_0_12px_rgba(236,72,153,0.08)] cursor-pointer active:scale-95"
                >
                  🔍 System Prompt Leak
                </button>
                <button
                  onClick={() => setAttackPrompt("safe")}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold font-mono border transition-all duration-300 bg-zinc-950/40 border-zinc-800 text-green-400 hover:border-green-500 hover:bg-green-950/15 hover:shadow-[0_0_12px_rgba(34,197,94,0.08)] cursor-pointer active:scale-95"
                >
                  ✅ Safe Prompt
                </button>
              </div>
            )}

            {activeTab === "tools" && (
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => setAttackPrompt("delete_database_tool")}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold font-mono border transition-all duration-300 bg-zinc-950/40 border-zinc-800 text-red-500 hover:border-red-600 hover:bg-red-950/20 hover:shadow-[0_0_12px_rgba(239,68,68,0.1)] cursor-pointer active:scale-95"
                >
                  🔥 Trigger delete_database
                </button>
                <button
                  onClick={() => setAttackPrompt("read_secrets_tool")}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold font-mono border transition-all duration-300 bg-zinc-950/40 border-zinc-800 text-orange-500 hover:border-orange-600 hover:bg-orange-950/20 hover:shadow-[0_0_12px_rgba(249,115,22,0.1)] cursor-pointer active:scale-95"
                >
                  🔑 Trigger read_secrets
                </button>
                <button
                  onClick={() => setAttackPrompt("export_customer_data_tool")}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold font-mono border transition-all duration-300 bg-zinc-950/40 border-zinc-800 text-pink-500 hover:border-pink-600 hover:bg-pink-950/20 hover:shadow-[0_0_12px_rgba(236,72,153,0.1)] cursor-pointer active:scale-95"
                >
                  📦 Trigger export_customer_data
                </button>
                <button
                  onClick={() => setAttackPrompt("weather_tool")}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold font-mono border transition-all duration-300 bg-zinc-950/40 border-zinc-800 text-cyan-400 hover:border-cyan-500 hover:bg-cyan-950/20 hover:shadow-[0_0_12px_rgba(6,182,212,0.1)] cursor-pointer active:scale-95"
                >
                  ☀️ Trigger get_weather
                </button>
              </div>
            )}

            {activeTab === "policies" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="bg-zinc-950/50 border border-zinc-850 p-2.5 rounded-xl text-xs leading-relaxed text-zinc-400 font-mono">
                  <strong className="text-zinc-300 block mb-0.5">🔒 Threat Threshold:</strong>
                  Requests exceeding a risk rating of 75% are blocked automatically.
                </div>
                <div className="bg-zinc-950/50 border border-zinc-850 p-2.5 rounded-xl text-xs leading-relaxed text-zinc-400 font-mono">
                  <strong className="text-zinc-300 block mb-0.5">🛠️ Execution Safety:</strong>
                  Prohibited API parameters are stripped instantly at the middleware layer.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Active Guarded Tools policies panel */}
        <div className="bg-zinc-950/60 border border-zinc-850 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold font-mono tracking-widest text-zinc-500 uppercase block mb-3">
              Guarded System Tools
            </span>
            <div className="space-y-2">
              {ACTIVE_POLICIES.map((tool) => (
                <div 
                  key={tool.name}
                  className={`p-2 rounded-lg border text-[11px] font-mono flex items-center justify-between ${tool.color}`}
                >
                  <span className="font-bold flex items-center gap-1.5">
                    <span>{tool.icon}</span>
                    <span>{tool.name}</span>
                  </span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-current font-sans">
                    {tool.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between gap-2">
            <button
              onClick={async () => {
                try {
                  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clear-logs`, { method: "DELETE" });
                  await loadLogs();
                  await loadRuntimeLogs();
                } catch (e) {
                  // Fallback for offline sandbox clearing
                  window.location.reload();
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-red-950/20 hover:text-red-400 border border-zinc-800 hover:border-red-900/40 text-zinc-500 font-mono text-2xs cursor-pointer transition-all duration-200"
            >
              🗑️ Clear Logs
            </button>
            <span className="text-[10px] text-zinc-600 font-mono self-center">Ver: 1.0.4-shield</span>
          </div>
        </div>
      </div>

      {/* Primary Trigger Pulsing Button */}
      <div className="mt-6 border-t border-zinc-800/80 pt-5 flex justify-end">
        <button
          onClick={sendPrompt}
          disabled={loading || !prompt.trim()}
          className={`px-8 py-4.5 rounded-xl font-bold font-mono text-sm transition-all duration-300 flex items-center gap-2 border cursor-pointer active:scale-98 ${
            loading || !prompt.trim()
              ? "bg-zinc-900 border-zinc-850 text-zinc-500 cursor-not-allowed"
              : "bg-cyan-500 border-cyan-400 hover:bg-cyan-400 hover:border-cyan-300 text-black shadow-lg shadow-cyan-500/10 hover:shadow-cyan-400/20"
          }`}
        >
          <span>{loading ? "⚙️" : "⚡"}</span>
          <span>{loading ? "Intercepting & Analyzing Threat..." : "Simulate Security Interception"}</span>
        </button>
      </div>
    </div>
  );
}