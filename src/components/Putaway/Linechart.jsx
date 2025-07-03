"use client";
import React from "react";
import {
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);
  return isMobile;
}

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

export default function Linechart() {
  const isMobile = useIsMobile();
  return (
    <>
      <div className="w-full p-2 col-span-2">
        <div className="w-full h-[360px] flex justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={enrichedData}>
              {/* Grid lines */}
              <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />

              <XAxis
                dataKey="Time"
                stroke="#71717A"
                tick={{ fill: "#71717A" }}
                label={{
                  value: "Time",
                  position: "insideBottom",
                  offset: -2,
                  fill: "#71717A",
                  style: { fontSize: 12, fontWeight: 500 },
                }}
              />
              <YAxis
                stroke="#71717A"
                tick={{ fill: "#71717A" }}
                label={{
                  value: "Efficiency(%)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#71717A",
                }}
              />
              <Tooltip
                formatter={(value, name) =>
                  name === "efficiency" ? `${value}%` : value
                }
              />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke="#6EE7B7"
                fill="#f97316"
                dot={true}
                name="Efficiency (%)"
                strokeWidth={4}
              >
                <LabelList
                  dataKey="efficiency"
                  position="insideTopRight"
                  fill="#71717A"
                  fontWeight={700}
                  fontSize={isMobile ? 3 : 12}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
