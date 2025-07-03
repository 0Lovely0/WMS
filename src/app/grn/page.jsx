"use client";
import Areachart from "../../Components/Grn/Areachart";
import TimingTable from "../../Components/Grn/TimingTable";
import Cards from "../../Components/Grn/Cards";
import MainTable from "../../Components/Grn/MainTable";
import PageNavigation from "../../Components/PageNavigation";
import StopEvents from "@/components/StopEvents";
import Loader from "../../Components/Loader";

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
