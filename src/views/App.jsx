import { useRoutes } from "react-router-dom";
import { Suspense, lazy, useContext } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { AppContext } from "../context/AppContext";
import ScrollToTop from "../utils/ScrollToTop";
import { motion } from "framer-motion";
import MainLayout from "./layout/MainLayout";
import Breadcrumb from "../components/ui/Breadcrumb/Breadcrumb";
import GlobalLoader from "../utils/GlobalLoader";
import GlobalErrorBoundary from "../utils/GlobalErrorBoundary";
import Social from "../components/ui/Socail/Social";
import { DynamicHelmetProvider } from "../context/DynamicHelmetContext";
import DynamicHelmet from "../utils/Helmet/DynamicHelmet";
import ApplyHelmet from "../utils/Helmet/ApplyHelmet";
import { SettingContext } from "../context/SettingContext";

// Lazy load components
const Home = lazy(() => import("../components/page/home/home"));
const Products = lazy(() => import("../components/page/products/products"));
const Slug = lazy(() => import("../components/page/slug/slug"));
const Services = lazy(() => import("../components/page/services/services"));
const Gallery = lazy(() => import("../components/page/galleries/galleries"));
const Contact = lazy(() => import("../components/page/contact/contact"));
const Post = lazy(() => import("../components/page/post/post"));
const Header = lazy(() => import("./partials/header/header"));
const Footer = lazy(() => import("./partials/footer/footer"));

const MotionWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    style={{ minHeight: "calc(100vh - 10rem)" }}
  >
    {children}
  </motion.div>
);
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
          element: (
            <Suspense fallback={<GlobalLoader />}>
              <MotionWrapper>
                <Home />
              </MotionWrapper>
            </Suspense>
          ),
          name: `${language === "vi" ? "Trang Chủ" : "Home"}`,
        },
        {
          path: "products",
          element: (
            <Suspense fallback={<GlobalLoader />}>
              <MotionWrapper>
                <Products />
              </MotionWrapper>
            </Suspense>
          ),
          name: `${language === "vi" ? "Sản Phẩm" : "Products"}`,
          title: `${language === "vi" ? "Sản Phẩm" : "Products"}`,
        },
        {
          path: "products/:slug",
          element: (
            <Suspense fallback={<GlobalLoader />}>
              <MotionWrapper>
                <Slug />
              </MotionWrapper>
            </Suspense>
          ),
        },
        {
          path: "service",
          element: (
            <Suspense fallback={<GlobalLoader />}>
              <MotionWrapper>
                <Services />
              </MotionWrapper>
            </Suspense>
          ),
          name: `${language === "vi" ? "Dịch Vụ" : "Services"}`,
          title: `${language === "vi" ? "Dịch Vụ" : "Services"}`,
        },
        {
          path: "gallery",
          element: (
            <Suspense fallback={<GlobalLoader />}>
              <MotionWrapper>
                <Gallery />
              </MotionWrapper>
            </Suspense>
          ),
          name: `${language === "vi" ? "Thư Viện Ảnh" : "Gallery"}`,
          title: `${language === "vi" ? "Thư Viện Ảnh" : "Gallery"}`,
        },
        {
          path: "contact",
          element: (
            <Suspense fallback={<GlobalLoader />}>
              <MotionWrapper>
                <Contact />
              </MotionWrapper>
            </Suspense>
          ),
          name: `${language === "vi" ? "Liên Hệ" : "Contact"}`,
          title: `${language === "vi" ? "Liên Hệ" : "Contact"}`,
        },
        {
          path: "menus/:id/post",
          element: (
            <Suspense fallback={<GlobalLoader />}>
              <MotionWrapper>
                <Post />
              </MotionWrapper>
            </Suspense>
          ),
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
        <Suspense fallback={<GlobalLoader />}>
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
        </Suspense>
      </GlobalErrorBoundary>
    </DynamicHelmetProvider>
  );
}

export default App;
