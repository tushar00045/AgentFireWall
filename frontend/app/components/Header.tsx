export default function Header() {
  return (
    <div className="border-b border-zinc-800 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-bold tracking-tight">
            Agent Firewall
          </h1>
          <p className="text-zinc-400 mt-2">
            AI Runtime Security &
            Threat Intelligence Platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-ping absolute" />
            <div className="w-4 h-4 bg-green-500 rounded-full relative" />
          </div>
          <p className="text-green-400 font-semibold">
            Firewall Active
          </p>
        </div>
      </div>
    </div>
  );
}