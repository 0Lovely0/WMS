const rawData = [
  { Time: "9am", total_putaway_quantity: 1000, remaining_items: 800 },
  { Time: "10am", total_putaway_quantity: 2000, remaining_items: 1500 },
  { Time: "11am", total_putaway_quantity: 500, remaining_items: 300 },
  { Time: "12pm", total_putaway_quantity: 500, remaining_items: 400 },
  { Time: "1pm", total_putaway_quantity: 1000, remaining_items: 600 },
  { Time: "2pm", total_putaway_quantity: 700, remaining_items: 250 },
  { Time: "3pm", total_putaway_quantity: 800, remaining_items: 300 },
  { Time: "4pm", total_putaway_quantity: 200, remaining_items: 0 },
  { Time: "5pm", total_putaway_quantity: 300, remaining_items: 2 },
  { Time: "6pm", total_putaway_quantity: 1000, remaining_items: 50 },
  { Time: "7pm", total_putaway_quantity: 1000, remaining_items: 50 },
  { Time: "8pm", total_putaway_quantity: 1000, remaining_items: 50 },
];

const getStarRating = (efficiency) => {
  if (efficiency === 0) return "⭐ 0";
  if (efficiency <= 20) return "⭐ 1";
  if (efficiency <= 40) return "⭐⭐ 2";
  if (efficiency <= 60) return "⭐⭐⭐ 3";
  if (efficiency <= 80) return "⭐⭐⭐⭐ 4";
  return "⭐⭐⭐⭐⭐ 5";
};

const enrichedData = rawData.map((d) => {
  const efficiency = Number(
    (
      ((d.total_putaway_quantity - d.remaining_items) /
        d.total_putaway_quantity) *
      100
    ).toFixed(2)
  );
  return {
    ...d,
    efficiency,
    starEfficiency: getStarRating(efficiency),
  };
});

export default function Table() {
  return (
    <>
     <h2 className="text-center text-[20px] font-light text-neutral-600">
        Putaway Efficiency Table
      </h2>
      <table className="min-w-full bg-transparent table-auto border-collapse ">
       
        <thead>
          <tr
          className=" text-sm uppercase tracking-wider text-gray-600 bg-neutral-200 sticky top-0 z-50">
            <th className="px-1 py-1 text-center">
            Time
            </th>
            <th className="px-1 py-1 text-center">
              Total Putaway
            </th>
            <th className="px-1 py-1 text-center">
              Remaining
            </th>
            <th className="px-1 py-1 text-center">
              Efficiency (%)
            </th>
            <th className="px-1 py-1 text-center">
              Star Rating
            </th>
          </tr>
        </thead>
        <tbody className="text-neutral-600 text-sm">
          {enrichedData.map((row, index) => (
            <tr
              key={index}
              className={`transition-all duration-300 hover:bg-neutral-200`}
            >
              <td className="px-1 py-1 text-center">{row.Time}</td>
              <td className="px-1 py-1 text-center">
                {row.total_putaway_quantity}
              </td>
              <td className="px-1 py-1 text-center">{row.remaining_items}</td>
              <td className="px-1 py-1 text-center">{row.efficiency}%</td>
              <td className="px-1 py-1 text-center">{row.starEfficiency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
