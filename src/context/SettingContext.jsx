import { createContext, useEffect, useState } from "react";
import { getSettings } from "../utils/utils";

export const SettingContext = createContext();

const SettingProvider = ({ children }) => {
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    fetchDataSetting();

  }, []);
  const fetchDataSetting = async () => {
    try {
      const res = await getSettings();
      if (res.status === 200) {
        setSettings(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <SettingContext.Provider value={{ settings }}>
      {children}
    </SettingContext.Provider>
  );
};

export default SettingProvider;
