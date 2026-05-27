interface Props {
  trustScore: number;
  posture: {
    label: string;
    color: string;
  };
}

export default function SecurityPosture({trustScore, posture,
}: Props) {
  return (
    <div
      className={`mb-8 border rounded-2xl p-5 ${
        trustScore >= 80
          ? "bg-green-900/20 border-green-700"
          : trustScore >= 50
          ? "bg-yellow-900/20 border-yellow-700"
          : "bg-red-900/20 border-red-700"
      }`}
    >
      <h2
        className={`text-2xl font-bold ${posture.color}`}
      >
        Security Posture: {posture.label}
      </h2>

      <p className="text-zinc-300 mt-2">

        {trustScore >= 80
          ? "System activity appears safe and trusted."
          : trustScore >= 50
          ? "Suspicious activity patterns detected."
          : "Critical threat behavior detected. Immediate investigation recommended."}
      </p>
    </div>
  );
}