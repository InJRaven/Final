import { createContext, useEffect, useState } from "react";
import { getSettings } from "../utils/utils";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "vi"
  );
  const toggleLanguage = () => {
    const newLanguage = language === "vi" ? "en" : "vi";
    localStorage.setItem("language", newLanguage);
    setLanguage(newLanguage); // Sửa lỗi tại đây
  };
  console.log(language);
  return (
    <AppContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
