// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   LabelList,
// } from "recharts";
// import PageNavigation from "../../Components/PageNavigation";
// import Loader from "../../Components/Loader";

// function useIsMobile(breakpoint = 640) {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, [breakpoint]);

//   return isMobile;
// }

// // Sample GE data
// const data = [
//   { no: "GE/1", Live_Entries: 5 },
//   { no: "GE/2", Live_Entries: 10 },
//   { no: "GE/3", Live_Entries: 2 },
//   { no: "GE/4", Live_Entries: 7 },
//   { no: "GE/5", Live_Entries: 15 },
//   { no: "GE/6", Live_Entries: 13 },
//   { no: "GE/7", Live_Entries: 6 },
//   { no: "GE/8", Live_Entries: 10 },
//   { no: "GE/9", Live_Entries: 18 },
//   { no: "GE/10", Live_Entries: 20 },
//   { no: "GE/11", Live_Entries: 12 },
//   { no: "GE/12", Live_Entries: 15 },
//   { no: "GE/13", Live_Entries: 14 },
//   { no: "GE/14", Live_Entries: 11 },
//   { no: "GE/15", Live_Entries: 10 },
//   { no: "GE/16", Live_Entries: 9 },
//   { no: "GE/17", Live_Entries: 8 },
//   { no: "GE/18", Live_Entries: 19 },
//   { no: "GE/19", Live_Entries: 25 },
//   { no: "GE/20", Live_Entries: 35 },
// ];

// export default function GEBarChart() {
//   const isMobile = useIsMobile();
//   const average =
//     data.length > 0
//       ? (
//           data.reduce((sum, item) => sum + item.Live_Entries, 0) / data.length
//         ).toFixed(1)
//       : 0;

//   return (
//     <div className=" py-6 w-full min-h-screen">
//       {/* <Loader/> */}

//       <PageNavigation topPath="/grn" bottomPath="/asn" />
//       {/* Chart Section */}
//       <div className="grid grid-cols-1 justify-items-center w-full ">
//         <div
//           className="w-full p-4 h-[500px]"
//         >
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={data}
//               margin={{ top: 0, right: 0, left: 0, bottom: 5 }}
//             >
//               <XAxis dataKey="no" stroke="black" />
//               <YAxis
//                 dataKey="Live_Entries"
//                 stroke="black"
//                 tickFormatter={(value) => (isMobile ? value : `${value}`)}
//               />
//               <Tooltip />
//               <Legend fill="white" />
//               <Bar
//                 dataKey="Live_Entries"
//                 stroke="Black"
//                 fill="#C29BD7"
//                 radius={[10, 10, 0, 0]}
//               >
//                 <LabelList
//                   dataKey="Live_Entries"
//                   position="insideTop"
//                   fill="black"
//                   fontSize={isMobile ? 6 : 15}
//                 />
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";
import PageNavigation from "../../Components/PageNavigation";

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

// Sample GE data
const data = [
  { no: "GE/1", Live_Entries: 5 },
  { no: "GE/2", Live_Entries: 10 },
  { no: "GE/3", Live_Entries: 2 },
  { no: "GE/4", Live_Entries: 7 },
  { no: "GE/5", Live_Entries: 15 },
  { no: "GE/6", Live_Entries: 13 },
  { no: "GE/7", Live_Entries: 6 },
  { no: "GE/8", Live_Entries: 10 },
  { no: "GE/9", Live_Entries: 18 },
  { no: "GE/10", Live_Entries: 20 },
  { no: "GE/11", Live_Entries: 12 },
  { no: "GE/12", Live_Entries: 15 },
  { no: "GE/13", Live_Entries: 14 },
  { no: "GE/14", Live_Entries: 11 },
  { no: "GE/15", Live_Entries: 10 },
  { no: "GE/16", Live_Entries: 9 },
  { no: "GE/17", Live_Entries: 8 },
  { no: "GE/18", Live_Entries: 19 },
  { no: "GE/19", Live_Entries: 25 },
  { no: "GE/20", Live_Entries: 35 },
];

export default function GEBarChart() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <PageNavigation topPath="/grn" bottomPath="/asn" />

      {/* Center chart vertically and horizontally */}
      <div className="flex-grow flex items-center justify-center px-2">
        <div className="w-full max-w-7xl h-[400px] sm:h-[500px] md:h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 5 }}>
              <XAxis
                dataKey="no"
                stroke="#6B7280"
                tick={{ fontSize: isMobile ? 10 : 14, fill: "#6B7280" }}
              />
              
              <YAxis
                stroke="#6B7280"
                tick={{ fontSize: isMobile ? 10 : 14, fill: "#6B7280" }}
                label={{
                value: "No of Live Entries",
                angle: -90,
                position: "outsideLeft",
                fill: "#737373",
              }}
              />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: isMobile ? 10 : 14 }} />
              <Bar
                dataKey="Live_Entries"
                fill="#C29BD7"
                radius={[10, 10, 0, 0]}
              >
                <LabelList
                  dataKey="Live_Entries"
                  position="insideTop"
                  fill="#000"
                  fontSize={isMobile ? 8 : 14}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
