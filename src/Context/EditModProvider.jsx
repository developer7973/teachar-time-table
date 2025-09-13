import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const EditModContext = createContext();

export const EditModProvider = ({ children }) => {
  const [editMod, setEditMod] = useState(false);
  const [showEditModSwitch, setEditModShowSwitch] = useState(false);

  useEffect(() => {
    const cookieVal = Cookies.get("editMod");
    setEditMod(cookieVal === "true" ? true : false);
  }, []);

  return (
    <EditModContext.Provider
      value={{ editMod, setEditMod, showEditModSwitch, setEditModShowSwitch }}
    >
      {children}
    </EditModContext.Provider>
  );
};

export const useEditMod = () => useContext(EditModContext);
