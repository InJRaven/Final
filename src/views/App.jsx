import { useRoutes } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { DynamicHelmetProvider } from "../context/DynamicHelmetContext";
import DynamicHelmet from "../utils/Helmet/DynamicHelmet";
import ApplyHelmet from "../utils/Helmet/ApplyHelmet";
import { SettingContext } from "../context/SettingContext";
import ScrollToTop from "../utils/ScrollToTop";
import GlobalErrorBoundary from "../utils/GlobalErrorBoundary";
import Header from "./partials/header/header";
import Footer from "./partials/footer/footer";
import Breadcrumb from "../components/ui/Breadcrumb/Breadcrumb";
import Social from "../components/ui/Socail/Social";

import MainLayout from "./layout/MainLayout";
import Home from "../components/page/home/home";
import Products from "../components/page/products/products";
import Slug from "../components/page/slug/slug";
import Services from "../components/page/services/services";
import Gallery from "../components/page/galleries/galleries";
import Contact from "../components/page/contact/contact";
import Post from "../components/page/post/post";
function App() {
  const { language } = useContext(AppContext);
  const { loading } = useContext(SettingContext);

  const routesConfig = [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Home />,
          name: `${language === "vi" ? "Trang Chủ" : "Home"}`,
        },
        {
          path: "products",
          element: <Products />,
          name: `${language === "vi" ? "Sản Phẩm" : "Products"}`,
          title: `${language === "vi" ? "Sản Phẩm" : "Products"}`,
        },
        {
          path: "products/:slug",
          element: <Slug />,
        },
        {
          path: "service",
          element: <Services />,
          name: `${language === "vi" ? "Dịch Vụ" : "Services"}`,
          title: `${language === "vi" ? "Dịch Vụ" : "Services"}`,
        },
        {
          path: "gallery",
          element: <Gallery />,
          name: `${language === "vi" ? "Thư Viện Ảnh" : "Gallery"}`,
          title: `${language === "vi" ? "Thư Viện Ảnh" : "Gallery"}`,
        },
        {
          path: "contact",
          element: <Contact />,
          name: `${language === "vi" ? "Liên Hệ" : "Contact"}`,
          title: `${language === "vi" ? "Liên Hệ" : "Contact"}`,
        },
        {
          path: "menus/:id/post",
          element: <Post />,
        },
      ],
    },
  ];

  const routes = useRoutes(routesConfig);
  const hidden =
    location.pathname === "/" ||
    location.pathname === "/service" ||
    location.pathname === "/contact" ||
    location.pathname === "/posts";

  return (
    <DynamicHelmetProvider>
      <DynamicHelmet />
      {!loading && <ApplyHelmet routesConfig={routesConfig} />}
      <GlobalErrorBoundary>
        <ScrollToTop />
        <div
          className={`grid grid-cols-1 ${
            hidden
              ? "grid-rows-[auto_1fr_auto]"
              : "grid-rows-[auto_auto_1fr_auto]"
          } min-h-screen h-screen relative`}
        >
          <Header />
          {!hidden && <Breadcrumb routes={routesConfig} />}
          <Social />
          {routes}
          <Footer />
        </div>
      </GlobalErrorBoundary>
    </DynamicHelmetProvider>
  );
}

export default App;
