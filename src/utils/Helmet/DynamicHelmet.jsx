import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useDynamicHelmet } from "../../context/DynamicHelmetContext";
import { useFullUrl } from "../useFullUrl/useFullUrl";

const DynamicHelmet = () => {
  const { title, metaTag } = useDynamicHelmet();
  const fullUrl = useFullUrl();
  // Xác định favicon
  const favicon = useMemo(() => {
    return metaTag?.favicon || "/default-favicon.png"; // Ưu tiên favicon từ meta, fallback về favicon mặc định
  }, [metaTag]);
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={metaTag.ogTitle || title} />
      <meta property="og:type" content={metaTag.ogType || "article"} />
      <meta property="og:url" content={metaTag.ogUrl || fullUrl} />
      <meta name="description" content={metaTag.description || title} />
      <meta property="og:image" content={metaTag.ogImage || "default.jpg"} />
      <link rel="icon" href={favicon}  type="image/webp"></link>
      
    </Helmet>
  );
};

export default DynamicHelmet;
