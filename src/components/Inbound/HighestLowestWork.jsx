const rawData = [
  { label: "po", Total_PO: 1000, Remaining_PO: 2000 },
  { label: "asn", Total_ASN: 1500, Remaining: 400 },
  { label: "gateEntries", Total_Live_GE: 500 },
  {
    label: "grn",
    Total_GRN: 2000,
    Remaining_GRN: 1000,
    Highest_hour: "4pm",
    Lowest_hour: "11am",
    GRN_Done: 1000,
    Ok_Quantity: 800,
    Rejected_Quantity: 200,
  },
  {
    label: "putaway",
    Total_Putaway: 1000,
    Remaining_Putaway: 200,
    Highest_hour: "10pm",
    Lowest_hour: "2pm",
  },
];

const grnEntry = rawData.find((d) => d.label === "grn");

  const putawayEntry = rawData.find((d) => d.label === "putaway");

const HighestLowest = () => (
  <div className="w-full h-full rounded-xl z-20">
    <h2 className="flex justify-center text-lg font-semibold text-neutral-500 mb-4 mt-5 sm:mt-0">
      Highest and Lowest Workdone Hours
    </h2>

    <div className="flex flex-wrap justify-center items-center gap-x-26 gap-y-4">
      {[
        {
          label: "Highest GRN",
          value: grnEntry?.Highest_hour || 0,
          color: "#7E8299",
          background: "#E1F0FF",
          text: "#3699FF",
        },
        {
          label: "Lowest GRN",
          value: grnEntry?.Lowest_hour || 0,
          color: "#7E8299",
          background: "#FFE2E5",
          text: "#F64E60",
        },
        {
          label: "Highest Putaway",
          value: putawayEntry?.Highest_hour,
          color: "#7E8299",
          background: "#EEE5FF",
          text: "#8950FC",
        },
        {
          label: "Lowest Putaway",
          value: putawayEntry?.Lowest_hour || 0,
          color: "#7E8299",
          background: "#FFE2E5",
          text: "#F64E60",
        },
      ].map(({ label, value, color, background, text }) => (
        <div
          key={label}
          className="w-full sm:w-[250px] h-[100px] flex flex-col justify-center items-center text-center rounded-lg"
          style={{ color, backgroundColor: background }}
        >
          <h4 className="text-md font-bold">{label}</h4>
          <p className="text-2xl font-bold" style={{ color: text }}>
            {value}
          </p>
        </div>
      ))}
    </div>
  </div>
);


export default HighestLowest;