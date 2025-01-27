import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
const SideBar = ({ menu }) => {
  const [openDropdown, setOpenDropdown] = useState(null); // Theo dõi dropdown nào đang mở

  const toggleDropdown = (index) => {
    setOpenDropdown((prevIndex) => (prevIndex === index ? null : index)); // Toggle dropdown
  };

  return (
    <aside className="w-full h-fit col-start-1 col-end-2 bg-light border border-light-active flex flex-col gap-[0.5rem] items-stretch rounded-[0.6rem] sidebar">
      {menu.map((item, index) => (
        <div
          key={item.id}
          className="w-full"
          onMouseEnter={() => setOpenDropdown(index)} // Giữ dropdown mở khi hover
          onMouseLeave={() => setOpenDropdown(null)} // Đóng dropdown khi rời chuột khỏi element
        >
          {item.children && item.children.length > 0 ? (
            <div className="inline-flex w-full items-center justify-between text-md xs:text-xs text-gray-600 font-medium transition duration-200 hover:text-dark hover:bg-gray-200 px-4 py-2 cursor-pointer">
              <span>
                {item.translations.find((t) => t.locale === "vi")?.name}
              </span>
              {openDropdown === index ? (
                <ChevronDownIcon className="h-6 w-6" />
              ) : (
                <ChevronRightIcon className="h-6 w-6" />
              )}
            </div>
          ) : (
            <NavLink
              to={`/menus/${item.id}/post`}
              target="_blank"
              className="inline-flex w-full items-center justify-between text-md xs:text-xs text-gray-600 font-medium transition duration-200 hover:text-dark hover:bg-gray-200 px-4 py-2"
            >
              <span>
                {item.translations.find((t) => t.locale === "vi")?.name}
              </span>
            </NavLink>
          )}
          {item.children &&
            item.children.length > 0 &&
            openDropdown === index && (
              <div
                className={`flex flex-col transition-all duration-300 overflow-hidden ${
                  openDropdown === index
                    ? "max-h-[500px] opacity-100 visible"
                    : "max-h-0 opacity-0 invisible"
                }`}
              >
                {item.children.map((child) => (
                  <NavLink
                    key={child.id}
                    to={`/menus/${child.id}/post`}
                    target="_blank"
                    className="inline-flex w-full items-center justify-between text-md xs:text-xs text-gray-600 font-semibold transition duration-200 hover:text-dark hover:bg-gray-200 px-4 py-2 pl-10"
                  >
                    {child.translations.find((t) => t.locale === "vi")?.name}
                  </NavLink>
                ))}
              </div>
            )}
        </div>
      ))}
    </aside>
  );
};

export default SideBar;
