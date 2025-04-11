import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css"; 
import { BankProvider } from "./context/BankContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BankProvider>
      <App />
    </BankProvider>
  </React.StrictMode>
);
