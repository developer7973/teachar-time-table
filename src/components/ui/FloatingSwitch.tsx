import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Cookies from "js-cookie";
import { useTheme } from "../../Context/ThemeProvider";
import { useEditMod } from "../../Context/EditModProvider";
import { Switch } from "./switch";

export default function FloatingSwitch() {
  const { editMod, setEditMod, showEditModSwitch, setEditModShowSwitch } =
    useEditMod();
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: showEditModSwitch ? "88%" : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="fixed bottom-6 right-6 z-50 flex items-center"
    >
      {/* Toggle Button (Always Visible, sticks to screen edge) */}
      <button
        onClick={() => {
          setEditModShowSwitch(!showEditModSwitch);
        }}
        className={`p-2 rounded-full shadow-md transition-all duration-300
        ${theme ? "bg-black/40" : "bg-white/30 text-white"}
        hover:scale-110 hover:shadow-lg`}
        style={{
          backdropFilter: "blur(10px)",
        }}
      >
        <motion.div
          animate={{ rotate: showEditModSwitch ? 0 : 180 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.div>
      </button>

      {/* Floating Panel */}
      <div
        className={`flex items-center gap-3 px-5 py-3 ml-2
        font-inter rounded-full shadow-lg border border-white/30
        ${
          theme
            ? "bg-black/20 backdrop-blur-xl"
            : "bg-white/20 backdrop-blur-xl text-white"
        }
        transition-all duration-300`}
      >
        <span className="text-sm font-semibold select-none">Edit Mode</span>
        <Switch
          name="editMod"
          checked={editMod}
          onCheckedChange={(checked) => {
            setEditMod(checked);
            Cookies.set("editMod", String(checked), { expires: 1 / 24 }); // 1 hour
          }}
        />
      </div>
    </motion.div>
  );
}
