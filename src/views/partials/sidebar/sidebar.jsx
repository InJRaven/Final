import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import "./sideBar.scss";

const SideBar = ({ menu }) => {
  const [openDropdown, setOpenDropdown] = useState(null); // Theo dõi dropdown nào đang mở

  return (
    <aside className="w-full h-fit bg-light border border-light-active flex flex-col  items-stretch rounded-md sidebar">
      {menu.map((item, index) => (
        <div
          key={item.id}
          className="w-full border-b last:border-none border-gray-500"
          onMouseEnter={() => setOpenDropdown(index)} // Giữ dropdown mở khi hover
          onMouseLeave={() => setOpenDropdown(null)} // Đóng dropdown khi rời chuột khỏi element
        >
          {item.children && item.children.length > 0 ? (
            <div className="inline-flex w-full items-center justify-between text-sm xs:text-xs text-gray-600 font-medium transition duration-200 hover:text-dark hover:bg-gray-200 px-4 py-2 cursor-pointer first:rounded-md last:rounded-md ">
              <span>{item.name}</span>
              {openDropdown === index ? (
                <ChevronDownIcon className="h-6 w-6" />
              ) : (
                <ChevronRightIcon className="h-6 w-6" />
              )}
            </div>
          ) : (
            <NavLink
              to={`${item.url}`}
              target="_blank"
              className="inline-flex w-full items-center justify-between text-sm xs:text-xs text-gray-600 font-medium transition duration-200 hover:text-dark hover:bg-gray-200 px-4 py-[0.6rem] first:rounded-md last:rounded-md"
            >
              <span>
                {item.name}
                
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
                    to={`/${item.url}`}
                    target="_blank"
                    className="inline-flex w-full items-center justify-between text-sm xs:text-xs text-gray-600 font-semibold transition duration-200 hover:text-dark hover:bg-gray-200 px-4 py-2 pl-10 "
                  >
                    {child.name}
                    
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
