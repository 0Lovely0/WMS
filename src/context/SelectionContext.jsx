"use client";

import { createContext, useContext, useState } from "react";

const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedClient, setSelectedClient] = useState("");

  return (
    <SelectionContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        selectedClient,
        setSelectedClient,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error("useSelection must be used inside a SelectionProvider");
  }
  return context;
};
