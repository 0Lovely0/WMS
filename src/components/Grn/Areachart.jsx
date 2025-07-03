import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  AreaChart,
  Area,
} from "recharts";

// Hook for mobile detection
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
// Sample GRN data
const grnData = [
  {
    Hours: "9am",
    total_quantity: 1000,
    GRN_done: 500,
    rejected_quantity: 100,
    vendor: "Suresh",
    Remaining_Qty: 400,
  },
  {
    Hours: "10am",
    total_quantity: 700,
    GRN_done: 500,
    rejected_quantity: 100,
    vendor: "Lovely",
    Remaining_Qty: 100,
  },
  {
    Hours: "11am",
    total_quantity: 1500,
    GRN_done: 500,
    rejected_quantity: 200,
    vendor: "Piyush",
    Remaining_Qty: 200,
  },
  {
    Hours: "12pm",
    total_quantity: 1000,
    GRN_done: 500,
    rejected_quantity: 300,
    Remaining_Qty: 400,
  },
  {
    Hours: "13pm",
    total_quantity: 1000,
    GRN_done: 500,
    rejected_quantity: 300,
    Remaining_Qty: 200,
  },
  {
    Hours: "14pm",
    total_quantity: 1500,
    GRN_done: 500,
    rejected_quantity: 300,
    Remaining_Qty: 400,
  },
  {
    Hours: "15pm",
    total_quantity: 2000,
    GRN_done: 500,
    rejected_quantity: 300,
    Remaining_Qty: 1000,
  },
  {
    Hours: "16pm",
    total_quantity: 1500,
    GRN_done: 500,
    rejected_quantity: 300,
    Remaining_Qty: 400,
  },
  {
    Hours: "17pm",
    total_quantity: 1000,
    GRN_done: 500,
    rejected_quantity: 300,
    Remaining_Qty: 600,
  },
  {
    Hours: "18pm",
    total_quantity: 900,
    GRN_done: 500,
    rejected_quantity: 300,
    Remaining_Qty: 300,
  },
  {
    Hours: "19pm",
    total_quantity: 800,
    GRN_done: 500,
    rejected_quantity: 300,
    Remaining_Qty: 300,
  },
  {
    Hours: "20pm",
    total_quantity: 1000,
    GRN_done: 500,
    rejected_quantity: 300,
    Remaining_Qty: 200,
  },
];

// Star rating logic
const getStarRating = (efficiency) => {
  let rating = 0;
  if (efficiency === 0) {
    rating = 0;
  } else {
    rating = Math.ceil(efficiency / 20);
  }
  let stars = "";
  for (let i = 0; i < rating; i++) {
    stars += "⭐";
  }
  return `${stars} ${rating}`;
};

// Enriched GRN data
const enrichedGRN = grnData.map((item) => {
  const ok_quantity = item.GRN_done - item.rejected_quantity;
  const Remaining_Quantity = item.total_quantity - item.GRN_done;

  const efficiency = item.total_quantity
    ? Number(
        (
          ((item.total_quantity - Remaining_Quantity) / item.total_quantity) *
          100
        ).toFixed(2)
      )
    : 0;

  return {
    ...item,
    ok_quantity,
    Remaining_Quantity,
    efficiency,
    starEfficiency: getStarRating(efficiency),
  };
});

export default function Areachart() {
  const isMobile = useIsMobile();
  return (
    <>
      <div className="w-full h-[400px]">
     
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={enrichedGRN}>
            <defs>
            
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#166534" stopOpacity={0.8} />{""}
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.2} />
              </linearGradient>

             
              <linearGradient id="colorRemaining" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9d174d" stopOpacity={0.8} />{" "}
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="Hours"
              stroke="black"
              tick={{ fill: "black", fontSize:10 }}
              label={{
                value: "Time (24 hr format)",
                position: "insideBottom",
                offset: -2,
                fill: "#52525B",
                style: { fontSize: 10, fontWeight: 500 },
              }}
            />
            <YAxis
              stroke="black"
              tick={{ fill: "black", fontSize:10 }}
              label={{
                value: "Quantity",
                angle: -90,
                position: "insideLeft",
                fill: "#52525B",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#404040",
                border: "1px solidrgb(183, 175, 192)",
                borderRadius: "12px",
              }}
              labelStyle={{
                color: "#D8B4FE",
                fontWeight: "600",
              }}
            />
          
            {/* <Legend
              payload={[
                {
                  value: "Total Quantity",
                  type: "square",
                  id: "ID01",
                  color: "#22c55e",
                },
                {
                  value: "Remaining_Qty",
                  type: "square",
                  id: "ID02",
                  color: "#9d174d", 
                },
              ]}
            /> */}
       
            <Area
              type="monotone"
              dataKey="total_quantity"
              stroke="#52525B" 
              fill="url(#colorTotal)"
              name="Total Quantity"
              strokeWidth={2}
              dot={{ r: 4, stroke: "#fff", strokeWidth: 1 }}
            >
              <LabelList
                dataKey="total_quantity"
                position="top"
                fill="black"
                fontSize={isMobile ? 6 : 12}
              />
            </Area>
            <Area
              type="monotone"
              dataKey="Remaining_Qty"
              stroke="#FFD580" 
              fill="url(#colorRemaining)"
              name="Remaining_Qty"
              strokeWidth={2}
              dot={{ r: 4, stroke: "#fff", strokeWidth: 1 }}
            >
              <LabelList
                dataKey="Remaining_Qty"
                position="top"
                fill="black"
                fontSize={isMobile ? 6 : 10}
              />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

