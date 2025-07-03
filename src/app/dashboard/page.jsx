"use client";

import Barchart from "@/components/Inbound/BarchartDashboard";
import HighLow from "@/components/Inbound/HighestLowestWork";
import Efficiency from "@/components/Inbound/EfficiencyChart";
import Rejectedgrn from "@/components/Inbound/Rejectedgrn";
import Cards from "@/components/Inbound/GrnPutawaydetailscards";
import PageNavigation from "../../Components/PageNavigation";
import Loader from "../../Components/Loader";
import StopEvents from "@/components/StopEvents"
export default function Inbound() {
  return (
    <>
     <PageNavigation topPath="/po" bottomPath="/putaway" />
     <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-min-h-full p-3 gap-x-2 ">
      
      {/* <Loader /> */}
      
      {/* Summary Cards */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-4 w-full">
      <Cards/>
      </div>

      {/* Bar Chart */}
      <div className="col-span-1 sm:col-span-2 rounded-lg border border-neutral-200 mt-4 sm:mt-6 h-[400px]"
      >
      <Barchart/>
      </div>

      {/* Efficiency Pie Chart */}
      <div className="col-span-1 rounded-xl items-center mt-4 sm:mt-6 h-[400px]">
      <Efficiency/>
      </div>

      {/* Rejected GRN Table */}
       <StopEvents>
      <div className="flex justify-center items-center col-span-1 border border-neutral-200 rounded-2xl p-0 mt-4 sm:mt-6 h-[400px]">
     
      <Rejectedgrn />
     
      </div>
       </StopEvents>

      {/* High Low Work Summary cards*/}
      <div className="col-span-1 sm:col-span-2 lg:col-span-4 p-1 sm:h-[155px] rounded-lg mt-0 sm:mt-2 h-[415px] w-full">
      <HighLow/>
      </div>
    </div>
    </>
  );
}


