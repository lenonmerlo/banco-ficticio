import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cliente from "./pages/Cliente";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cliente/:cpfCnpj" element={<Cliente />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
