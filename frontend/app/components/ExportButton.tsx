interface Props {
  exportSecurityReport: any;
}

export default function ExportButton({
  exportSecurityReport,
}: Props) {

  return (

    <div className="mt-8 flex justify-end">

      <button
        onClick={exportSecurityReport}
        className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl font-semibold"
      >
        Export Security Report
      </button>

    </div>
  );
}