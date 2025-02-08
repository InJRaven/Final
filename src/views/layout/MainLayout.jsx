import { Outlet, useParams } from "react-router-dom";
import SideBar from "../partials/sidebar/sidebar";
const MainLayout = () => {
  const hidden =
    location.pathname === "/" ||
    location.pathname === "/service" ||
    location.pathname === "/contact";
  const { url } = useParams();

  const isHomePage = location.pathname === "/";
  const isPostPage = url;


  return (
    <>
      <main
        className={`${
          hidden ? "row-start-2" : "row-start-3 "
        }row-span-1 col-start-1 w-full`}
      >
        <div
          className={`${
            isHomePage || isPostPage
              ? "relative w-full grid grid-cols-6 gap-[2rem] padding-page"
              : "relative w-full grid grid-cols-6 gap-[2rem]"
          }`}
        >
          {(isHomePage || isPostPage) && <SideBar />}
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MainLayout;
