import { useContext, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

const Breadcrumb = ({ routes }) => {
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại
  const pathnames = location.pathname.split("/").filter(Boolean); // Loại bỏ phần tử rỗng
  const { language } = useContext(AppContext);

  // Hàm tìm route từ cấu trúc routes
  const findRoute = (routes, currentPath) => {
    for (const route of routes) {
      if (`/${route.path}` === currentPath) return route; // Đường dẫn tĩnh

      // Kiểm tra children
      if (route.children) {
        const found = findRoute(route.children, currentPath);
        if (found) return found;
      }
    }
    return null;
  };

  // Tính toán breadcrumbs
  const breadcrumbs = useMemo(() => {
    let currentPath = "";
    return pathnames
      .map((item) => {
        currentPath += `/${item}`;
        const foundRoute = findRoute(routes, currentPath);
        return {
          path: currentPath,
          name: foundRoute?.name || item, // Hiển thị tên từ route hoặc sử dụng tên mặc định từ URL
        };
      })
      .filter((breadcrumb) => breadcrumb.name); // Loại bỏ breadcrumbs không có tên
  }, [pathnames, routes]);

  return (
    <section className="rol-start-2 grid grid-cols-6 gap-[4rem] py-[2rem] bg-gray-200 heading">
      <nav
        className="col-start-2 col-span-4 px-[2rem] gap breadcrumb"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center justify-start gap-[0.6rem] breadcrumb__menu">
          {/* Home breadcrumb */}
          <li className="breadcrumb__menu--item">
            <Link to="/" className="!text-md breadcrumb__menu--link">
              {language === "vi" ? "Trang Chủ" : "Home"}
            </Link>
          </li>
          {/* Render breadcrumbs */}
          {breadcrumbs.map((item, index) => (
            <li
              className="gap-[0.6rem] breadcrumb__menu--item"
              key={item.path || index}
            >
              <span className="flex items-center justify-center text-xs font-bold text-gray-700 icon">
                <i className="ki-duotone ki-right" />
              </span>
              <Link to={item.path} className="!text-md breadcrumb__menu--link">
                {item.name}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
};

export default Breadcrumb;