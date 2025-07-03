const grnData = [
  { Hours: "9am", total_quantity: 1000, GRN_done: 500, rejected_quantity: 100, vendor: "Suresh" },
  { Hours: "10am", total_quantity: 700, GRN_done: 500, rejected_quantity: 100, vendor: "Lovely" },
  { Hours: "11am", total_quantity: 1500, GRN_done: 500, rejected_quantity: 200, vendor: "Piyush" },
  { Hours: "12pm", total_quantity: 1000, GRN_done: 500, rejected_quantity: 300, vendor: "Piyush" },
  { Hours: "13pm", total_quantity: 1000, GRN_done: 500, rejected_quantity: 300, vendor: "Piyush" },
  { Hours: "14pm", total_quantity: 1500, GRN_done: 500, rejected_quantity: 300, vendor: "Piyush" },
  { Hours: "15pm", total_quantity: 2000, GRN_done: 500, rejected_quantity: 300, vendor: "Piyush" },
  { Hours: "16pm", total_quantity: 1500, GRN_done: 500, rejected_quantity: 300, vendor: "Piyush" },
  { Hours: "17pm", total_quantity: 1000, GRN_done: 500, rejected_quantity: 300, vendor: "Piyush" },
  { Hours: "18pm", total_quantity: 900, GRN_done: 500, rejected_quantity: 300, vendor: "Piyush" },
  { Hours: "19pm", total_quantity: 800, GRN_done: 500, rejected_quantity: 300, vendor: "Piyush" },
  { Hours: "20pm", total_quantity: 1000, GRN_done: 500, rejected_quantity: 300, vendor: "Piyush" },
];

// Utilities
const getStarRating = (eff) => "⭐".repeat(Math.ceil(eff / 20)) + ` ${Math.ceil(eff / 20)}`;

// Preprocess data
const enrichedGRN = grnData.map(({ total_quantity, GRN_done, rejected_quantity, ...rest }) => {
  const ok_quantity = GRN_done - rejected_quantity;
  const Remaining_Quantity = total_quantity - GRN_done;
  const efficiency = total_quantity ? +(((total_quantity - Remaining_Quantity) / total_quantity) * 100).toFixed(2) : 0;
  return { total_quantity, GRN_done, rejected_quantity, ...rest, ok_quantity, Remaining_Quantity, efficiency, starEfficiency: getStarRating(efficiency) };
});

// Totals
const totals = enrichedGRN.reduce(
  (acc, curr) => {
    acc.total_quantity += curr.total_quantity;
    acc.Remaining_Quantity += curr.Remaining_Quantity;
    acc.GRN_done += curr.GRN_done;
    acc.rejected_quantity += curr.rejected_quantity;
    acc.ok_quantity += curr.ok_quantity;
    acc.efficiency += curr.efficiency;
    return acc;
  },
  { total_quantity: 0, Remaining_Quantity: 0, GRN_done: 0, rejected_quantity: 0, ok_quantity: 0, efficiency: 0 }
);

export default function Cards() {
  const avgEfficiency = (totals.efficiency / enrichedGRN.length).toFixed(2);
  const starEfficiency = getStarRating(Number(avgEfficiency));

  const cardData = [
    { title: "Total Quantity", value: totals.total_quantity, background: "#E1F0FF", color:"#3699FF" },
    { title: "Remaining Quantity", value: totals.Remaining_Quantity,  background: "#C9F7F5", color:"#1BC5BD" },
    { title: "Total GRN Done", value: totals.GRN_done ,  background: "#EEE5FF", color:"#8950FC"},
    { title: "OK Quantity", value: totals.ok_quantity ,  background: "#FFE2E5", color:"#F64E60"},
    { title: "Rejected Quantity", value: totals.rejected_quantity,  background: "#DFFFE0", color:"#6FBF71" },
    { title: "Total Efficiency", value: `${avgEfficiency}%`, extra: starEfficiency,  background: "#FFFACD", color:"#A8902D" },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-1 space-x-10 p-2">
      {cardData.map(({ title, value, extra, color, background }, idx) => (
        <div key={idx} className="w-[180px] h-[100px] flex flex-col justify-center text-center  rounded-2xl border-gray-600 " style={{background:background}}>
          <h4 className="text-neutral-500 font-bold text-lg">{title}</h4>
          <p className="text-3xl font-bold" style={{color:color}}>{value}</p>
          {extra && <p className="text-lg text-neutral-500">{extra}</p>}
        </div>
      ))}
    </div>
  );
}

// 'use client';
// import { useEffect, useState } from 'react';

// // Utility to convert efficiency to stars
// const getStarRating = (eff) => "⭐".repeat(Math.ceil(eff / 20)) + ` ${Math.ceil(eff / 20)}`;

// export default function Cards() {
//   const [grnStats, setGrnStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchGRNData = async () => {
//       try {
//         const res = await fetch('https://pwms.coderootz.com/api/grn');
//         const json = await res.json();

//         if (json.status === 'success') {
//           setGrnStats(json.data);
//         }
//       } catch (error) {
//         console.error('Failed to fetch GRN data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGRNData();
//   }, []);

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading...</p>;
//   }

//   if (!grnStats) {
//     return <p className="text-center text-red-500">Failed to load GRN data</p>;
//   }

//   const {
//     total_quantity,
//     remaining_quantity,
//     total_grn_done,
//     total_okay_quantity,
//     total_rejected_quantity,
//     average_efficiency
//   } = grnStats;

//   const cardData = [
//     { title: "Total Quantity", value: total_quantity, background: "#E1F0FF", color: "#3699FF" },
//     { title: "Remaining Quantity", value: remaining_quantity, background: "#C9F7F5", color: "#1BC5BD" },
//     { title: "Total GRN Done", value: total_grn_done, background: "#EEE5FF", color: "#8950FC" },
//     { title: "OK Quantity", value: total_okay_quantity, background: "#FFE2E5", color: "#F64E60" },
//     { title: "Rejected Quantity", value: total_rejected_quantity, background: "#DFFFE0", color: "#6FBF71" },
//     { title: "Total Efficiency", value: `${average_efficiency}%`, extra: getStarRating(average_efficiency), background: "#FFFACD", color: "#A8902D" },
//   ];

//   return (
//     <div className="flex flex-wrap justify-center items-center gap-1 space-x-10 p-2">
//       {cardData.map(({ title, value, extra, color, background }, idx) => (
//         <div key={idx} className="w-[180px] h-[100px] flex flex-col justify-center text-center rounded-2xl border-gray-600" style={{ background }}>
//           <h4 className="text-neutral-500 font-bold text-lg">{title}</h4>
//           <p className="text-3xl font-bold" style={{ color }}>{value}</p>
//           {extra && <p className="text-lg text-neutral-500">{extra}</p>}
//         </div>
//       ))}
//     </div>
//   );
// }

