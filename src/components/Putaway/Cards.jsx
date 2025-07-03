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

const getStarRating = (eff) => `⭐`.repeat(Math.min(5, Math.ceil(eff / 20))) + ` ${Math.ceil(eff / 20) || 0}`;

const enrichedData = rawData.map((d) => {
  const efficiency = +(((d.total_putaway_quantity - d.remaining_items) / d.total_putaway_quantity) * 100).toFixed(2);
  return { ...d, efficiency, starEfficiency: getStarRating(efficiency) };
});

const hours = rawData.length;
let totalPutaway = 0, totalRemaining = 0, bestHour = enrichedData[0];

enrichedData.forEach(({ total_putaway_quantity, remaining_items, efficiency }) => {
  totalPutaway += total_putaway_quantity;
  totalRemaining += remaining_items;
  if (efficiency > bestHour.efficiency) bestHour = { total_putaway_quantity, remaining_items, efficiency, ...bestHour };
});

const putawayRate = (totalPutaway / hours).toFixed(2);
const totalFulfilled = totalPutaway - totalRemaining;
const averagePutawayTime = ((hours * 60) / totalFulfilled).toFixed(2);

const metrics = [
  { label: "Total Putaway Items", value: totalPutaway, bg: "bg-blue-200", color: "text-blue-400" },
  { label: "Putaway Rate (items/hour)", value: putawayRate, bg: "bg-cyan-100", color: "text-cyan-400" },
  { label: "Highest Performing Hour", value: bestHour.Time, bg: "bg-emerald-100", color: "text-emerald-400" },
  { label: "Average Putaway Time (min)", value: averagePutawayTime, bg: "bg-fuchsia-100", color: "text-fuchsia-400" },
];

export default function Cards() {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-25 mx-auto">
      {metrics.map(({ label, value, bg, color }) => (
        <div key={label} className={`w-[230px] h-[100px] flex flex-col justify-center text-center p-1 rounded-xl ${bg}`}>
          <h3 className="text-sm md:text-sm font-bold text-neutral-600">{label}</h3>
          <p className={`text-xl md:text-4xl font-bold mt-2 ${color}`}>{value}</p>
        </div>
      ))}
    </div>
  );
}
