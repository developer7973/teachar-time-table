import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Tables from "./pages/Tables";
import Dashboard from "./pages/Dashboard";
import Header from "./components/common/Header";
import Animated from "./components/common/Animated";
import { Toaster } from "react-hot-toast";
import { useTheme } from "./Context/ThemeProvider";
import { useEditMod } from "./Context/EditModProvider";
import { Switch } from "./components/ui/switch";
import Cookies from "js-cookie";
import FloatingSwitch from "./components/ui/FloatingSwitch";

function App() {
  const { editMod, setEditMod } = useEditMod();

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
        <FloatingSwitch />
      </BrowserRouter>
    </>
  );
}

export default App;
