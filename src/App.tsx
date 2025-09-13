import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Tables from "./pages/Tables";
import Dashboard from "./pages/Dashboard";
import Header from "./components/common/Header";
import Animated from "./components/common/Animated";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Animated />
        <Header />
        <Routes>
          <Route path="/" element={<Tables />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
              fontSize: "14px",
            },
          }}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
