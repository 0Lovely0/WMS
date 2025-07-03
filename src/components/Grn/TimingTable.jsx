// GRN data and enrichment
const grnData = [
  { Hours: "9am", total_quantity: 1000, GRN_done: 500, rejected_quantity: 100, vendor: "Suresh", Remaining_Qty: 400 },
  { Hours: "10am", total_quantity: 700, GRN_done: 500, rejected_quantity: 100, vendor: "Lovely", Remaining_Qty: 100 },
  { Hours: "11am", total_quantity: 1500, GRN_done: 500, rejected_quantity: 200, vendor: "Piyush", Remaining_Qty: 200 },
  { Hours: "12pm", total_quantity: 1000, GRN_done: 500, rejected_quantity: 300, Remaining_Qty: 400 },
  { Hours: "13pm", total_quantity: 1000, GRN_done: 500, rejected_quantity: 300, Remaining_Qty: 200 },
  { Hours: "14pm", total_quantity: 1500, GRN_done: 500, rejected_quantity: 300, Remaining_Qty: 400 },
  { Hours: "15pm", total_quantity: 2000, GRN_done: 500, rejected_quantity: 300, Remaining_Qty: 1000 },
  { Hours: "16pm", total_quantity: 1500, GRN_done: 500, rejected_quantity: 300, Remaining_Qty: 400 },
  { Hours: "17pm", total_quantity: 1000, GRN_done: 500, rejected_quantity: 300, Remaining_Qty: 600 },
  { Hours: "18pm", total_quantity: 900, GRN_done: 500, rejected_quantity: 300, Remaining_Qty: 300 },
  { Hours: "19pm", total_quantity: 800, GRN_done: 500, rejected_quantity: 300, Remaining_Qty: 300 },
  { Hours: "20pm", total_quantity: 1000, GRN_done: 500, rejected_quantity: 300, Remaining_Qty: 200 },
];

// Star rating logic
const getStarRating = (efficiency) => {
  let rating = efficiency === 0 ? 0 : Math.ceil(efficiency / 20);
  return `${"⭐".repeat(rating)} ${rating}`;
};

// Enriched GRN data
const enrichedGRN = grnData.map((item) => {
  const ok_quantity = item.GRN_done - item.rejected_quantity;
  const Remaining_Quantity = item.total_quantity - item.GRN_done;
  const efficiency = item.total_quantity
    ? Number((((item.total_quantity - Remaining_Quantity) / item.total_quantity) * 100).toFixed(2))
    : 0;

  return {
    ...item,
    ok_quantity,
    Remaining_Quantity,
    efficiency,
    starEfficiency: getStarRating(efficiency),
  };
});

// Table component
export default function TimingTable() {
  return (
    <>
    <div className="flex flex-col">

    <h2 className="text-center text-[20px] font-light text-neutral-500">
    Overall Efficiency Table
  </h2>

  <div className=" max-w-full">
    <table className="min-w-full table-auto border-collapse">
      <thead className="w-full">
        <tr
          className="text-amber-600 text-sm uppercase tracking-wider bg-neutral-200 sticky top-0 z-50"
        >
          <th className="px-13 py-1 text-center text-gray-600 ">Timing</th>
        
          <th className="px-13 py-1 text-center text-gray-600 ">Efficiency (%)</th>
        </tr>
      </thead>
      <tbody className="text-gray-300 text-sm ">
        {enrichedGRN.map((item, index) => (
          <tr
            key={index}
            className="transition-all duration-300 text-neutral-800 hover:bg-neutral-200"
          >
            <td className="px-1 py-1 text-center font-medium">{item.Hours}</td>
            <td className="px-1 py-1 text-center">
              {isNaN(item.efficiency) ? "-" : `${item.efficiency}%`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>
    </>
   
  );
}
