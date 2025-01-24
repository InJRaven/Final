import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

import "./sideBar.scss";
import { ChevrRightIcon } from "../../../components/ui/Icon/Icon";
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/solid';


const SideBar = ({menu}) => {
  const { language } = useContext(AppContext);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown((prevIndex) => (prevIndex === index ? null : index));
  };
  console.log(menu)
 
  return (
    <aside className="w-full h-fit col-start-1 col-span-1 bg-light border border-light-active flex flex-col items-stretch rounded-[0.6rem] sidebar">
      {menu.map((item, index) => (
        <div key={item.id} className="w-full">
          <NavLink
            to={`/menus/${item.id}/post`}
            target="_blank"
            className="inline-flex w-full items-center justify-between text-md xs:text-xs text-gray-600 font-semibold transition duration-200 hover:text-dark hover:bg-gray-200 sidebar-link px-4 py-2"
          >
            <span>{item.translations.find((t) => t.locale === "vi")?.name}</span>
            {item.children && item.children.length > 0 ? (
              <button
                onClick={(e) => {
                  e.preventDefault(); // Ngăn chặn điều hướng khi nhấn nút
                  toggleDropdown(index);
                }}
                className="flex items-center text-gray-600 hover:text-dark transition duration-200"
              >
                {openDropdown === index ? (
                  <ChevronDownIcon className="h-6 w-6" />
                ) : (
                  <ChevronRightIcon className="h-6 w-6" />
                )}
              </button>
            ) : null}
          </NavLink>
          {item.children && item.children.length > 0 && openDropdown === index && (
            <div className="pl-6 flex flex-col">
              {item.children.map((child) => (
                <NavLink
                  key={child.id}
                  to={`/menus/${child.id}/post`}
                  target="_blank"
                  className="inline-flex w-full items-center text-sm text-gray-500 font-medium transition duration-200 hover:text-dark hover:bg-gray-100 py-2"
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
