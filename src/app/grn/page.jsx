"use client";
import Areachart from "../../components/Grn/Areachart";
import TimingTable from "../../components/Grn/TimingTable";
import Cards from "../../components/Grn/Cards";
import MainTable from "../../components/Grn/MainTable";
import PageNavigation from "../../components/PageNavigation";
import StopEvents from "@/components/StopEvents";
// Main Component
export default function GRNDashboard() {
  return (
    <>
      <div
        className="grid grid-cols-1 lg:grid-cols-3 scrollhidden p-2"
        style={{ className: "fadeIn" }}
      >
        {/* <Loader/> */}
        <PageNavigation topPath="/putaway" bottomPath="/gateEntries" />

        {/* Area chart */}
        <div className="w-full col-span-2 h-[400px] mt-2">
          <Areachart />
        </div>

        {/* Side Timing Table */}
        <StopEvents>
        <div className="w-full h-[365px] flex justify-center items-center mt-3 rounded-xl">
          <TimingTable />
        </div>
        </StopEvents>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1">
        <Cards />
      </div>

      {/*Main Table */}
      <StopEvents>
      <div className=" shadow-2xl overflow-x-auto h-[200px]">
        <MainTable />
      </div>
      </StopEvents>
    </>
  );
}
