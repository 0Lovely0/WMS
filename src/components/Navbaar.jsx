"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { TbLogout } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { useSelection } from "../context/SelectionContext";
import Image from "next/image";

export default function Navbar({ onWmsClick }) {
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = useState("");
  const { selectedLocation, selectedClient } = useSelection();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      setCurrentDate(formattedDate);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pageNames = {
    "/dashboard": "Inbound Dashboard",
    "/po": "PO",
    "/asn": "ASN",
    "/gateEntries": "Live Gate Entries",
    "/grn": "GRN",
    "/putaway": "Putaway",
    "/": "Home",
  };

  const currentPageName = pageNames[pathname] || "Dashboard";

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="flex justify-between items-center border border-neutral-800 w-full">
        <div
          className="flex justify-start items-center w-[79px] h-[70px] cursor-pointer"
          style={{ backgroundColor: "#181824" }}
          onClick={onWmsClick}
        >
          <div className="ml-2">
            <Image src="/wms.png" className="w-10 ml-2" alt="Example image" width={60} height={60} />
          </div>
        </div>
        <div className="text-xl rounded-md font-semibold text-gray-500">
          <p className="text-xl sm:text-3xl md:text-2xl">{currentPageName}</p>
        </div>

        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu Items (Desktop) */}
        <div className="hidden sm:flex gap-6 items-center">
          <div className="flex gap-2 border border-gray-300 rounded-md p-2">
            <p className="text-md text-gray-500">
              || Location: {selectedLocation}
            </p>
            <p className="text-md text-gray-500">Client: {selectedClient} ||</p>
            <p className="text-neutral-500 font-semibold">{currentDate}</p>
          </div>

          <div className="relative group items-center cursor-pointer h-7">
            <Link
              href="/"
              className="flex flex-col items-center text-neutral-400 hover:text-red-500"
            >
              <TbLogout className="text-2xl sm:text-3xl group-hover:text-red-700 text-gray-500 hover:text-red-500 p-1 sm:p-0" />
              <span className="absolute top-8 mr-2 text-sm text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Exit
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div
          className="flex flex-col items-center gap-6 border-b border-l border-r border-neutral-700 p-6 sm:hidden shadow-lg"
          style={{ backgroundColor: "#181824" }}
        >
          <div className="flex flex-col items-center gap-2 border border-gray-600 rounded-md p-3 w-full max-w-xs bg-neutral-800">
            <p className="text-md text-white font-medium">
              Location: {selectedLocation}
            </p>
            <p className="text-md text-white font-medium">
              Client: {selectedClient}
            </p>
          </div>

          <div className="text-md text-white font-semibold py-2 px-4 bg-neutral-700 rounded-md">
            {currentDate}
          </div>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-white bg-neutral-800 border border-gray-600 rounded-lg p-3 w-full max-w-xs transition-all duration-300 hover:bg-red-600 hover:border-red-700 hover:shadow-lg"
          >
            <TbLogout className="text-3xl" />
            <span className="text-lg font-medium">Exit</span>
          </Link>
        </div>
      )}
    </>
  );
}