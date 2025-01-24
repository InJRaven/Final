import { Outlet, useParams } from "react-router-dom";

const MainLayout = () => {
 
  const hidden =
    location.pathname === "/" ||
    location.pathname === "/service" ||
    location.pathname === "/contact" 
  return (
    <>

      <main
        className={`${
          hidden ? "row-start-2" : "row-start-3 "
        }row-span-1 col-start-1 w-full`}
      >
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
