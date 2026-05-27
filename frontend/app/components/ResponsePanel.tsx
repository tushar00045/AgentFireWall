interface Props {
  response: string;
}

export default function ResponsePanel({
  response,
}: Props) {

  return (

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <h2 className="text-3xl font-bold mb-6">
        AI Response
      </h2>

      <div className="bg-black border border-zinc-700 rounded-xl p-5 min-h-[320px]">

        <p className="text-zinc-300 whitespace-pre-wrap leading-7">

          {response ||
            "Waiting for prompt..."}
        </p>
      </div>
    </div>
  );
}