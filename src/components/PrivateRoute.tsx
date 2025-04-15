import { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const logado = localStorage.getItem("logado") === "true";
  return logado ? children : <Navigate to="/login" replace />;
}
