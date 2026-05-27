interface Props {
  firewallData: any;
}

export default function FirewallAnalysis({
  firewallData,
}: Props) {

  return (

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <h2 className="text-3xl font-bold mb-6">
        Firewall Analysis
      </h2>

      <div className="space-y-8">

        <div>

          <p className="text-zinc-400 mb-2">
            Threat Type
          </p>

          <p className="text-2xl font-bold text-orange-400">

            {firewallData?.llm_analysis
              ?.threat_type ||
              "No Threat"}

          </p>

        </div>

        <div>

          <p className="text-zinc-400 mb-2">
            AI Security Reasoning
          </p>

          <div className="bg-black border border-zinc-700 rounded-xl p-5">

            <p className="text-zinc-300 leading-7">
              {firewallData?.llm_analysis
                ?.reason ||
                "No security issues detected."}
            </p>

                          {/* THREATS */}

              <div>
                <p className="text-zinc-400 mb-3">
                  Detected Threat Signatures
                </p>

                <div className="space-y-3">

                  {firewallData?.threats?.length > 0 ? (

                    firewallData.threats.map(
                      (threat: string, index: number) => (

                        <div
                          key={index}
                          className="bg-red-900/30 border border-red-700 px-4 py-3 rounded-xl"
                        >
                           {threat}
                        </div>

                      )
                    )

                  ) : (

                    <div className="bg-green-900/20 border border-green-700 px-4 py-3 rounded-xl text-green-400">

                      No malicious patterns detected

                    </div>

                  )}

                </div>

              </div>

              {/* AI MALICIOUS */}

              <div>

                <p className="text-zinc-400 mb-2">
                  AI Threat Assessment
                </p>

                <div
                  className={`px-4 py-3 rounded-xl font-bold w-fit ${
                    firewallData?.llm_analysis?.is_malicious
                      ? "bg-red-900/30 border border-red-700 text-red-400"
                      : "bg-green-900/20 border border-green-700 text-green-400"
                  }`}
                >

                  {firewallData?.llm_analysis?.is_malicious
                    ? "MALICIOUS"
                    : "SAFE"}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}