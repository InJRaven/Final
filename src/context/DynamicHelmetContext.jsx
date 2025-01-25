import React, { createContext, useContext, useState } from "react";

// Context quản lý tiêu đề
const DynamicHelmetContext = createContext();

export const useDynamicHelmet = () => useContext(DynamicHelmetContext);

export const DynamicHelmetProvider = ({ children }) => {
  const [title, setTitle] = useState("Default Title");
  const [metaTag, setMetaTag] = useState({
    ogTitle: "Default Title",
    ogType: "article",
    ogUrl: "",
    description: "Default Description",
    ogImage: "",
    favicon: ''
  })

  return (
    <DynamicHelmetContext.Provider value={{ title, setTitle ,metaTag, setMetaTag }}>
      {children}
    </DynamicHelmetContext.Provider>
  );
};
