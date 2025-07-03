"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Legend,
} from "recharts";
import { useRouter } from "next/navigation";


const rawData = [
  {
    label: "po",
    Total_PO: 2000,
    Remaining_PO: 1000,
  },
  {
    label: "asn",
    Total_ASN: 1500,
    Remaining: 400,
  },
  {
    label: "gateEntries",
    Total_Live_GE: 500,
  },
  {
    label: "grn",
    Total_GRN: 2000,
    Remaining_GRN: 1000,
  },
  {
    label: "putaway",
    Total_Putaway: 1000,
    Remaining_Putaway: 200,
  },
];

// Add Completed fields
const chartData = rawData.map((item) => ({
  ...item,
  Completed_PO:
    item.Total_PO && item.Remaining_PO != null
      ? item.Total_PO - item.Remaining_PO
      : undefined,
  Completed_ASN:
    item.Total_ASN && item.Remaining != null
      ? item.Total_ASN - item.Remaining
      : undefined,
  Completed_GRN:
    item.Total_GRN && item.Remaining_GRN != null
      ? item.Total_GRN - item.Remaining_GRN
      : undefined,
  Completed_Putaway:
    item.Total_Putaway && item.Remaining_Putaway != null
      ? item.Total_Putaway - item.Remaining_Putaway
      : undefined,
}));


const barConfigs = [
  { key: "Completed_PO", fill: "#3699FF", name: "Completed PO" },
  { key: "Remaining_PO", fill: "#99CCFF", name: "Remaining PO" },

  { key: "Completed_ASN", fill: "#1BC5BD", name: "Completed ASN" },
  { key: "Remaining", fill: "#80DFD9", name: "Remaining ASN" },

  { key: "Total_Live_GE", fill: "#FF8C00", name: "Live Entries" },

  { key: "Completed_GRN", fill: "#8950FC", name: "Completed GRN" },
  { key: "Remaining_GRN", fill: "#BE90FD", name: "Remaining GRN" },

  { key: "Completed_Putaway", fill: "#F64E60", name: "Completed Putaway" },
  { key: "Remaining_Putaway", fill: "#FA919F", name: "Remaining Putaway" },
];

export default function Barchart() {
  const router = useRouter();
  return (
    <>
      <h2 className="flex justify-center text-lg font-semibold text-neutral-500">
        Overall Inbound Graph
      </h2>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={chartData} barCategoryGap="1%" barSize={50}>
          <XAxis
            dataKey="label"
            stroke="#737373"
            fontSize="12px"
            tick={{ fontSize: "12px", fontWeight: "bold" }}
          />
          <YAxis
            stroke="#737373"
            fontSize="12px"
            tick={{ fontSize: "12px", fontWeight: "bold" }}
          />
          <Tooltip />
          <Legend />

          {barConfigs.map((bar) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              fill={bar.fill}
              name={bar.name}
              stackId="stacked"
              onClick={(data) => {
                if (data?.payload?.label) {
                  router.push(`/${data.payload.label}`);
                }
              }}
            >
              <LabelList
                dataKey={bar.key}
                position="insideTop"
                fill="white"
                fontSize="12"
              />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
