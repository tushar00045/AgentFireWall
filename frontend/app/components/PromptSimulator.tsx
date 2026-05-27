interface Props {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  sendPrompt: () => void;
  loading: boolean;
  setAttackPrompt: (type: string) => void;
  loadLogs: () => Promise<void>;
  loadRuntimeLogs: () => Promise<void>;
}

export default function PromptSimulator({
  prompt,
  setPrompt,
  sendPrompt,
  loading,
  setAttackPrompt,
  loadLogs,
  loadRuntimeLogs,
}: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
      
      <div className="flex justify-between items-center mb-6">
        
        <h2 className="text-3xl font-bold">
          Prompt Simulator
        </h2>

        <div className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300">
          AI Security Testing
        </div>

      </div>

      <textarea
        className="w-full h-44 bg-black border border-zinc-700 rounded-xl p-5 outline-none resize-none text-zinc-200"
        placeholder="Enter prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex flex-wrap gap-3 mt-6">

        <button
          onClick={() => setAttackPrompt("prompt_injection")}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
        >
          Prompt Injection
        </button>

        <button
          onClick={() => setAttackPrompt("admin_escalation")}
          className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg"
        >
          Admin Escalation
        </button>

        <button
          onClick={() => setAttackPrompt("jailbreak")}
          className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg"
        >
          Jailbreak Attack
        </button>

        <button
          onClick={() => setAttackPrompt("tool_attack")}
          className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg"
        >
          Tool Hijacking
        </button>

        <button
          onClick={() => setAttackPrompt("data_exfiltration")}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
        >
          Data Exfiltration
        </button>

        <button
          onClick={() => setAttackPrompt("system_leak")}
          className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg"
        >
          System Prompt Leak
        </button>

        <button
          onClick={() => setAttackPrompt("safe")}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
        >
          Safe Prompt
        </button>

        <button
          onClick={async () => {
            try {
              await fetch("http://127.0.0.1:8000/clear-logs", {
                method: "DELETE",
              });

              await loadLogs();
              await loadRuntimeLogs();
            } catch (error) {
              console.error("Failed to clear logs:", error);
            }
          }}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
        >
          Clear Logs
        </button>

        <button
          onClick={() => setAttackPrompt("delete_database_tool")}
          className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-lg"
        >
          Delete Database Tool
        </button>

        <button
          onClick={() => setAttackPrompt("read_secrets_tool")}
          className="bg-orange-700 hover:bg-orange-800 px-4 py-2 rounded-lg"
        >
          Read Secrets Tool
        </button>

        <button
          onClick={() => setAttackPrompt("export_customer_data_tool")}
          className="bg-pink-700 hover:bg-pink-800 px-4 py-2 rounded-lg"
        >
          Export Customer Data
        </button>

        <button
          onClick={() => setAttackPrompt("weather_tool")}
          className="bg-cyan-700 hover:bg-cyan-800 px-4 py-2 rounded-lg"
        >
          Weather Tool
        </button>

      </div>

      <button
        onClick={sendPrompt}
        disabled={loading}
        className="mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl text-lg font-semibold disabled:opacity-50"
      >
        {loading
          ? "Analyzing Threat..."
          : "Analyze Prompt"}
      </button>

    </div>
  );
}