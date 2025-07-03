"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelection } from "../context/SelectionContext";
import { GrMapLocation } from "react-icons/gr";

// Move static data outside component to prevent re-creation on each render
const locationClientMapping = {
  None: ["None"],
  DELHI: ["All", "24X7", "Client 2", "Client 3", "Client 4"],
  HARYANA: ["All", "Client 5", "Client 6", "Client 7", "Client 8"],
  SHIMLA: ["All", "Client 9", "Client 10", "Client 11", "Client 12"],
};

const TableComponent = () => {
  const router = useRouter();
  const { setSelectedLocation, setSelectedClient } = useSelection();

  const locations = Object.keys(locationClientMapping);

  const [localLocation, setLocalLocation] = useState(locations[0]);
  const [clients, setClients] = useState(locationClientMapping[localLocation]);
  const [localClient, setLocalClient] = useState(clients[0]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setSelectedLocation(localLocation);
    setSelectedClient(localClient);
  }, [localLocation, localClient]);

  const handleLocationChange = (e) => {
    const location = e.target.value;
    setLocalLocation(location);
    setClients(locationClientMapping[location]);
    setLocalClient(locationClientMapping[location][0]);
    setErrorMessage("");
  };

  const handleClientChange = (e) => {
    setLocalClient(e.target.value);
    setErrorMessage("");
  };

  const handleLogin = () => {
    if (localLocation === "None") {
      setErrorMessage("Please select Location");
       
    } else {
      router.push("/dashboard");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: "url('wmsrecode.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="bg-green-500/50 opacity-80 backdrop-blur-xl border border-white shadow-xl px-10 py-12 max-w-2xl w-full text-white h-[480px] rounded-3xl">
        <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
          <h1 className="text-5xl font-bold drop-shadow-lg">Welcome to</h1>
          <p className="text-lg">(WMS Throughput Dashboard)</p>

          {/* Location & Client Select */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl mt-6">
            <div className="w-full sm:w-1/2">
              {/* <label htmlFor="location-select" className="sr-only">
                Select Location
              </label> */}
              <h3 className="mb-2">Select Location</h3>
              <select
                id="location-select"
                value={localLocation}
                onChange={handleLocationChange}
                className="w-full h-[30px] px-1 py-1 rounded-md text-sm text-center text-white bg-black/40 focus:outline-none shadow-md"
              >
                {locations.map((loc, idx) => (
                  <option key={idx} value={loc} className="bg-black">
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-1/2">
              {/* <label htmlFor="client-select" className="sr-only">
                Select Client
              </label> */}
              <h3 className="mb-2">Select Client</h3>
              <select
                id="client-select"
                value={localClient}
                onChange={handleClientChange}
                className="w-full h-[30px] px-1 py-1 rounded-md text-sm text-center text-white bg-black/40 focus:outline-none shadow-md"
              >
                {clients.map((client, idx) => (
                  <option key={idx} value={client} className="bg-black">
                    {client}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="flex justify-center gap-3 items-center text-xl  mt-2">{errorMessage} <GrMapLocation className="text-2xl"/></p>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={errorMessage}
            className={`px-1 w-full sm:w-auto rounded text-lg mt-6 hover:font-bold transition-all duration-300 ease-out
              ${localLocation === "None"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-600/40 hover:bg-green-800"} 
              backdrop-blur-md border border-white/20 shadow-xl`}
          >
            Login to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
