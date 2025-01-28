import { createContext, useState } from "react";


export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    sessionStorage.getItem("language") || "vi"
  );
  const toggleLanguage = () => {
    const newLanguage = language === "vi" ? "en" : "vi";
    sessionStorage.setItem("language", newLanguage);
    setLanguage(newLanguage); // Sửa lỗi tại đây
  };
  return (
    <AppContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
