"use client";
import React from "react";
import Linechart from "../../components/Putaway/Linechart";
import Speedometer from "../../components/Putaway/Speedometer";
import Cards from "../../components/Putaway/Cards";
import PutawayTable from "../../components/Putaway/PutawayTable";
import PageNavigation from "../../components/PageNavigation";
import StopEvents from "@/components/StopEvents";

// Main Component
export default function PutawayDashboard() {
  return (
    <div className="p-2 md:p2 min-h-full scrollhiddenstyle">
      <div className="grid grid-cols-1 lg:grid-cols-3 mb-4 scrollhidden rounded-lg">
      {/* <Loader/> */}
      <PageNavigation topPath="/dashboard" bottomPath="/grn"/>
        <Linechart />

      <div className="w-full h-[380px] flex flex-col justify-center items-center overflow-x-auto">
          <Speedometer />
        </div>
      </div>

      <div
        className="gird grid-cols-1"
      >
        <Cards />
      </div>
 
      <StopEvents>
      <div
        className="mt-6 rounded-2xl overflow-x-auto h-[200px]"
      >
        <PutawayTable />
      </div>
      </StopEvents>
    </div>
  );
}
