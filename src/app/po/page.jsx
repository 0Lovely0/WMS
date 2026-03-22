
"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import PageNavigation from "../../components/PageNavigation";

// Mobile Detection Hook
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);
  return isMobile;
}

// Raw Data
const rawData = [
  { PO_no: "PO/1", quantity: 500, remaining_qty: 499 },
  { PO_no: "PO/2", quantity: 1000, remaining_qty: 0 },
  { PO_no: "PO/3", quantity: 1000, remaining_qty: 200 },
  { PO_no: "PO/4", quantity: 1000, remaining_qty: 100 },
  { PO_no: "PO/5", quantity: 1000, remaining_qty: 500 },
  { PO_no: "PO/6", quantity: 1000, remaining_qty: 450 },
  { PO_no: "PO/7", quantity: 1000, remaining_qty: 0 },
  { PO_no: "PO/8", quantity: 1000, remaining_qty: 350 },
  { PO_no: "PO/9", quantity: 1000, remaining_qty: 390 },
  { PO_no: "PO/10", quantity: 1000, remaining_qty: 400 },
];

const enrichedData = rawData.map((d) => ({ ...d }));
const totalOrdered = rawData.reduce((sum, item) => sum + item.quantity, 0);
const totalRemaining = rawData.reduce((sum, item) => sum + item.remaining_qty, 0);

export default function POChartsContainer() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full min-h-screen bg-white px-2 sm:px-6 md:px-10 py-6">
      <PageNavigation topPath="/asn" bottomPath="/dashboard" />

      {/* Chart */}
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={enrichedData}>
            <XAxis
              dataKey="PO_no"
              stroke="#737373"
              tick={{ fill: "#737373", fontSize: isMobile ? 10 : 14 }}
            />
            <YAxis
              stroke="#737373"
              tick={{ fill: "#737373", fontSize: isMobile ? 10 : 14 }}
              label={{
                value: "Quantity",
                angle: -90,
                position: "insideLeft",
                fill: "#737373",
              }}
            />
            <Tooltip
              formatter={(value, name) => (name === "efficiency" ? `${value}%` : value)}
              contentStyle={{ backgroundColor: "white", color: "#000" }}
            />
            <Legend wrapperStyle={{ fontSize: isMobile ? "10px" : "14px", color: "#000" }} />

            <Bar dataKey="quantity" fill="#5FAAFF" name="Total Qty">
              <LabelList
                dataKey="quantity"
                position="insideTop"
                fill="black"
                fontSize={isMobile ? 8 : 14}
              />
            </Bar>

            <Bar dataKey="remaining_qty" fill="#D6EDFF" name="Remaining Qty">
              <LabelList
                dataKey="remaining_qty"
                position="insideTop"
                fill="black"
                fontSize={isMobile ? 8 : 14}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <h2 className="text-center text-base sm:text-lg font-bold text-gray-600 mt-6 mb-2">
        PO Data Table
      </h2>

      <div className="w-full overflow-x-auto rounded-lg shadow border">
        {/* <StopEvents> */}
          <table className="min-w-full text-sm text-center">
            <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
              <tr className="text-blue-500">
                <th className="px-4 py-2">PO No</th>
                <th className="px-4 py-2">Qty</th>
                <th className="px-4 py-2">Rem Qty</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {enrichedData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-2">{item.PO_no}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">{item.remaining_qty}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-100 font-semibold">
              <tr>
                <td className="px-4 py-2">Total</td>
                <td className="px-4 py-2">{totalOrdered}</td>
                <td className="px-4 py-2">{totalRemaining}</td>
              </tr>
            </tfoot>
          </table>
        {/* </StopEvents> */}
      </div>
    </div>
  );
}
