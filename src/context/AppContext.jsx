import { createContext, useEffect, useState } from "react";
import { getMenu } from "../utils/utils";

export const AppContext = createContext(undefined);

const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    sessionStorage.getItem("language") || "vi"
  );

  const [sideMenu, setSideMenu] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await getMenu();
        if (response.status === 200) {
          setSideMenu(response.data.data);
        }
      } catch (error) {
        console.log("Fetch Related Error", error);
      }
    };
    fetchMenuData();
  }, [language]);

  const toggleLanguage = () => {
    const newLanguage = language === "vi" ? "en" : "vi";
    sessionStorage.setItem("language", newLanguage);
    setLanguage(newLanguage); // Sửa lỗi tại đây
  };
  return (
    <AppContext.Provider value={{ language, sideMenu, toggleLanguage }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
