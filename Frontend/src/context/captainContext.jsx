import React, { createContext, useState } from "react";
import axios from "axios";

// Create the context
export const CaptainDataContext = createContext();

// Create the provider component
export const CaptainContextProvider = ({ children }) => {
  const [captain, setCaptain] = useState(null);

  // Captain login

  return (
    <CaptainDataContext.Provider
      value={{
        captain,
        setCaptain,
      }}
    >
      {children}
    </CaptainDataContext.Provider>
  );
};
