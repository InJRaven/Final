import { createContext, useEffect, useState } from "react";
import { getSettings } from "../utils/utils";

export const SettingContext = createContext();

const SettingProvider = ({ children }) => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
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
    } finally {
      setLoading(false);
    }
  };
  return (
    <SettingContext.Provider value={{ settings, loading }}>
      {children}
    </SettingContext.Provider>
  );
};

export default SettingProvider;
