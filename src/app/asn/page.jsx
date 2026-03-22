"use client";

import React, { useState, useEffect } from "react";
import PageNavigation from "../../Components/PageNavigation";
import StopEvnts from "@/components/StopEvents";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";

// Hook to detect mobile screen
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

// Raw ASN data
const rawData = [
  { asn_no: "ASN/1", total_asn_quantity: 1000, remaining_quantity: 488 },
  { asn_no: "ASN/2", total_asn_quantity: 500, remaining_quantity: 198 },
  { asn_no: "ASN/3", total_asn_quantity: 1000, remaining_quantity: 700 },
  { asn_no: "ASN/4", total_asn_quantity: 500, remaining_quantity: 10 },
  { asn_no: "ASN/5", total_asn_quantity: 700, remaining_quantity: 200 },
  { asn_no: "ASN/6", total_asn_quantity: 500, remaining_quantity: 5 },
  { asn_no: "ASN/7", total_asn_quantity: 200, remaining_quantity: 0 },
  { asn_no: "ASN/8", total_asn_quantity: 700, remaining_quantity: 0 },
  { asn_no: "ASN/9", total_asn_quantity: 200, remaining_quantity: 10 },
  { asn_no: "ASN/10", total_asn_quantity: 600, remaining_quantity: 60 },
];

// Enriched data
const enrichedData = rawData.map((d) => ({ ...d }));

export default function ASNChartsCombined() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full min-h-screen px-2 sm:px-4 md:px-6 py-4">
      <PageNavigation topPath="/gateEntries" bottomPath="/po" />

      <div className="grid grid-cols-1 gap-6">
        {/* Bar Chart */}
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={enrichedData}>
              <XAxis
                dataKey="asn_no"
                stroke="#737373"
                tick={{ fontSize: isMobile ? 10 : 14, fill: "#737373" }}
              />
              <YAxis
                yAxisId="left"
                stroke="#737373"
                tick={{ fontSize: isMobile ? 10 : 14, fill: "#737373" }}
                label={{
                value: "Quantity",
                angle: -90,
                position: "insideLeft",
                fill: "#737373",
              }}
              />
              <YAxis yAxisId="right" orientation="right" hide />
              <Tooltip />

              {/* Bars */}
              <Bar
                yAxisId="left"
                dataKey="total_asn_quantity"
                fill="#66BB6A"
                name="Total Quantity"
              >
                <LabelList
                  dataKey="total_asn_quantity"
                  position="insideCenter"
                  fill="white"
                  fontSize={isMobile ? 8 : 14}
                />
              </Bar>

              <Bar
                yAxisId="left"
                dataKey="remaining_quantity"
                fill="#C8E6C9"
                name="Remaining Quantity"
              >
                <LabelList
                  dataKey="remaining_quantity"
                  position="insideCenter"
                  fill="black"
                  fontSize={isMobile ? 8 : 14}
                />
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* ASN Table */}
        <div className="w-full">
          <h2 className="text-center text-base sm:text-lg font-semibold text-gray-600 mb-2">
            ASN Total vs Remaining
          </h2>

          <div className="overflow-x-auto rounded-lg border shadow-md">
            <StopEvnts>
              <table className="min-w-full text-sm text-center">
                <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                  <tr className="text-green-500 font-semibold">
                    <th className="px-4 py-2">ASN No</th>
                    <th className="px-4 py-2">Total Qty</th>
                    <th className="px-4 py-2">Rem Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {enrichedData.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-all duration-200"
                    >
                      <td className="px-4 py-2">{item.asn_no}</td>
                      <td className="px-4 py-2">{item.total_asn_quantity}</td>
                      <td className="px-4 py-2">{item.remaining_quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </StopEvnts>
          </div>
        </div>
      </div>
    </div>
  );
}
