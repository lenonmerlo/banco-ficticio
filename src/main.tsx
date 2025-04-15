import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css"; 
import { BankProvider } from "./context/BankContext";
import { BrowserRouter } from "react-router-dom"; // ⬅️ Adicione esta linha

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <BankProvider>
        <App />
      </BankProvider>
    </BrowserRouter>
  </React.StrictMode>
);
