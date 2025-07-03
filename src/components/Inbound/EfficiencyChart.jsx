"use client"
import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";

const efficiencyData = [
  { name: "GRN Efficiency", value: 75 },
  { name: "Putaway Efficiency", value: 60 },
];

const COLORS = ["#99CCFF", "#BE90FD"]; // Colors for GRN and Putaway

export default function EfficiencyPieChart(){
  return (
    <div className="w-full p-1 bg-neutral-00 rounded-lg border border-neutral-200 h-full">
      <h2 className="flex items-center justify-center text-lg text-neutral-500 font-semibold" style={{}}>
        Efficiency GRN vs Putaway
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={efficiencyData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label={({percent }) =>` ${(percent * 100).toFixed(0)}%`}
          >
            {efficiencyData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
