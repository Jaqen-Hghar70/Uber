import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import UserContext from "./context/userContext.jsx";
import { CaptainContextProvider } from "./context/captainContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserContext>
        <CaptainContextProvider>
          <App />
        </CaptainContextProvider>
      </UserContext>
    </BrowserRouter>
  </StrictMode>
);
