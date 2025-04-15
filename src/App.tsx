import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Cliente from "./pages/Client";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import PaginaNaoEncontrada from "./pages/PageNotFound";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/cliente/:cpfCnpj"
          element={
            <PrivateRoute>
              <Cliente />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="*" element={<PaginaNaoEncontrada />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
