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

 //GRN average formula
 function AverageGRN(grnEntry, totalHours = 12) {
  const completedGRN = grnEntry.GRN_Done || 0;

  if (completedGRN <= 0) return 0;

  const timePerUnitHours = totalHours / completedGRN;
  const timePerUnitMinutes = timePerUnitHours * 60;

  return parseFloat(timePerUnitMinutes.toFixed(2)); // in minutes, rounded to 2 decimals
}

// Putaway Average formula
function AveragePutaway(putawayEntry, totalHours = 12) {
  const completedGRN =
    putawayEntry.Total_Putaway - putawayEntry.Remaining_Putaway || 0;

  if (completedGRN <= 0) return 0;

  const timePerUnitHours = totalHours / completedGRN;
  const timePerUnitMinutes = timePerUnitHours * 60;

  return parseFloat(timePerUnitMinutes.toFixed(2)); // in minutes, rounded to 2 decimals
}
const GrnputawayDetailsCards = () => (
  <div
    className="w-full h-full flex flex-col justify-center items-center"
    style={{
      marginTop: "5px",
        overflowY: "scroll",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
       
      }}
  >
    <h2 className="flex justify-center text-md font-semibold mt-2 text-neutral-500">
      GRN VS PUTAWAY
    </h2>
    <div className="flex flex-row flex-wrap justify-center align-middle gap-x-12 gap-y-5 my-auto"style={{marginTop:"10px"}}>
      {[
        {
          label: "Total GRN Qty",
          value: grnEntry?.Total_GRN || 0,
          color: "#7E8299",
          background: "#E1F0FF",
          text:"#3699FF",
        
        },
        {
          label: "Total Putaway Qty",
          value: putawayEntry?.Total_Putaway,
           color: "#7E8299",
          background: "#C9F7F5",
          text : "#1BC5BD"       
         
        },
        {
          label: "Rem. GRN Qty",
          value: grnEntry?.Remaining_GRN || 0,
          color: "#7E8299",
          background: "#EEE5FF",
          text : "#8950FC "     
         
        },
        {
          label: "Rem. Putaway Qty",
          value: putawayEntry?.Remaining_Putaway || 0,
          color: "#7E8299",
          background: "#FFE2E5",
          text : "#F64E60 "     
        },
        {
          label: "Average GRN",
          value: AverageGRN(grnEntry) + "unit/hour",
         color: "#7E8299",
          background: "#DFFFE0",
          text : "#6FBF71 "
         
        },
        {
          label: "Average Putaway",
          value: AveragePutaway(putawayEntry) + "unit/hour",
          color: "#7E8299",
          background: "#FFFACD",
          text : "#A8902D "
         
        },
      ].map(({ label, value, text, background, color}) => (
        <div
          key={label}
         className="w-full sm:w-[250px] lg:w-[180px] h-[100px] flex flex-col justify-center items-center text-center rounded-lg" style={{background:background}}>
          <h4 className="text-lg font-bold" style={{ color:color}}
>
            {label}
          </h4>
         
          <p className="text-gray-300 text-xl font-bold" style={{color:text}}>{value}</p>
        </div>
      ))}
    </div>
  </div>
);

export default GrnputawayDetailsCards;

