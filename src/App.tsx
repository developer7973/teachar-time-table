import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Tables from "./pages/Tables";
import Dashboard from "./pages/Dashboard";
import Header from "./components/common/Header";
import Animated from "./components/common/Animated";
import { Toaster } from "react-hot-toast";
import FloatingSwitch from "./components/ui/FloatingSwitch";
import Cookies from "js-cookie";
import SingleEdit from "./pages/SingleEdit";
function App() {
  const isVerified = Cookies.get("passwordVerified");

  return (
    <>
      <BrowserRouter>
        <Animated />
        <Header />
        <Routes>
          <Route path="/" element={<Tables />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/single-edit" element={<SingleEdit />} />
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
        {isVerified === "true" && <FloatingSwitch />}
      </BrowserRouter>
    </>
  );
}

export default App;
