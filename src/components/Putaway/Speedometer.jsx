import React from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
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

const totalPutaway = rawData.reduce(
  (sum, d) => sum + d.total_putaway_quantity,
  0
);
const getStarRating = (efficiency) => {
  if (efficiency === 0) return "⭐ 0";
  if (efficiency <= 20) return "⭐ 1";
  if (efficiency <= 40) return "⭐⭐ 2";
  if (efficiency <= 60) return "⭐⭐⭐ 3";
  if (efficiency <= 80) return "⭐⭐⭐⭐ 4";
  return "⭐⭐⭐⭐⭐ 5";
};

export default function speedometer() {
  const totalRemaining = rawData.reduce((sum, d) => sum + d.remaining_items, 0);
  const totalFulfilled = totalPutaway - totalRemaining;
  const efficiency = ((totalFulfilled / totalPutaway) * 100).toFixed(2);
  const needleRotation = (efficiency / 100) * 180;

  return (
    <>
      {/* Gauge (Speedometer) */}
      <h3 className="text-sm font-semibold text-neutral-600 text-center">
        Overall Putaway Efficiency
      </h3>

      <div className="relative w-full h-full flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[
                { name: "Low", value: 30, fill: "#A7F3D0" },
                { name: "Medium", value: 30, fill: "#6EE7B7" },
                { name: "High", value: 40, fill: "#34D399" },
              ]}
              startAngle={180}
              endAngle={0}
              innerRadius="70%"
              outerRadius="100%"
              paddingAngle={2}
              dataKey="value"
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Needle */}
        <div
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            width: "4px",
            height: "80px",
            backgroundColor: "black",
            transform: `translate(-50%, -100%) rotate(${
              needleRotation - 90
            }deg)`,
            transformOrigin: "bottom center",
            transition: "transform 0.5s ease-in-out",
            zIndex: 10,
          }}
        ></div>

        {/* Center cap */}
        <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 translate-y-6 w-6 h-6 bg-[#A1A1AA] rounded-full shadow z-20" />
      </div>

      {/* Speedometer Table */}

      <table className="min-w-[290px] min-h-[60px] mx-auto text-sm  rounded-lg shadow-sm">
        <tbody>
          <tr className="border-b">
            <td className="px-4 py-2 font-semibold text-left text-amber-600">Total Putaway</td>
            <td className="px-4 py-2 text-right">{totalPutaway}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 font-semibold text-left text-blue-600">Fulfilled</td>
            <td className="px-4 py-2 text-right">{totalFulfilled}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 font-semibold text-left text-cyan-600">Remaining</td>
            <td className="px-4 py-2 text-right">{totalRemaining}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 font-semibold text-left text-emerald-600">Efficiency</td>
            <td className="px-4 py-2 text-right">{efficiency}%</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold text-left text-fuchsia-600">Star Rating</td>
            <td className="px-4 py-2 text-right">
              {getStarRating(efficiency)}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
