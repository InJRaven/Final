import { useContext, useEffect } from "react";
import { matchPath } from "react-router-dom";
import { useDynamicHelmet } from "../../context/DynamicHelmetContext";
import { SettingContext } from "../../context/SettingContext";
import { useFullUrl } from "../useFullUrl/useFullUrl";


const ApplyHelmet = ({ routesConfig  }) => {
  const { setTitle, setMetaTag } = useDynamicHelmet();
  const { settings, loading } = useContext(SettingContext);
  const fullUrl = useFullUrl()

  useEffect(() => {
    if (loading || !settings) return;
    const currentPath = location.pathname;

    // Tìm route khớp với currentPath
    const route = routesConfig[0].children.find((r) => {
      return matchPath({ path: `/${r.path}`, end: true }, currentPath);
    });

    // Nếu tìm thấy route, cập nhật title
    if (route) {
        setTitle(route.title || settings?.settings?.title || "Loading");
        setMetaTag({
          ogTitle: route.title || settings?.settings?.title || "Default Title",
          ogType: "article",
          ogUrl: fullUrl,
          description: settings?.settings?.description || "Default description",
          ogImage: settings?.settings?.thumbnail || "default.jpg",
          favicon: settings?.settings?.logo || "/default-favicon.png",
        });
      }
  }, [location.pathname, setTitle, routesConfig, setMetaTag, fullUrl]);

  return null;
};

export default ApplyHelmet;
