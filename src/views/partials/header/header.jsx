import React, { useContext, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { US, VN } from "country-flag-icons/react/3x2";
import { SettingContext } from "../../../context/SettingContext";
import { AppContext } from "../../../context/AppContext";

const Header = () => {
  const { settings } = useContext(SettingContext);
  const { language, toggleLanguage } = useContext(AppContext);
  const logo = useMemo(() => settings?.settings?.logo, [settings]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const menuItems = [
    { to: "/", label: `${language === "vi" ? "Trang Chủ" : "Home"}` },
    {
      to: "/products",
      children: [
        {
          to: "/products?category_id=8",
          label: `${language === "vi" ? "Cơ Đánh" : "Billard Cue"}`,
        },
        {
          to: "/products?category_id=7",
          label: `${language === "vi" ? "Cơ Nhảy" : "Jump Cue"}`,
        },
        {
          to: "/products?category_id=6",
          label: `${language === "vi" ? "Cơ Phá" : "Break Cue"}`,
        },
        {
          to: "/products?category_id=10",
          label: `${language === "vi" ? "Ngọn Carbon Fiber" : "Carbon Fiber Shaft"}`,
        },
        {
          to: "/products?category_id=9",
          label: `${language === "vi" ? "Phụ Kiện" : "Billiard Accessories"}`,
        },
      ],
      label: `${language === "vi" ? "Sản Phẩm" : "Products"}`,
    },
    { to: "/service", label: `${language === "vi" ? "Dịch Vụ" : "Services"}` },
    {
      to: "/gallery",
      label: `${language === "vi" ? "Thư Viện Ảnh" : "Gallery"}`,
    },
    { to: "/contact", label: `${language === "vi" ? "Hỗ Trợ" : "Contact"}` },
  ];

  const handleMouseEnter = (index) => setOpenDropdown(index);
  const handleMouseLeave = () => setOpenDropdown(null);
  return (
    <header className="w-full bg-dark shadow-header flex flex-col items-center header">
      <div className="w-full bg-dark flex items-center justify-center py-[0.8rem] border-b-[1px] border-gray-400 header__introduce">
        <span className="uppercase text-white font-medium text-xs">
          DARIUS PHAN CUSTOM CUES AND REPAIR SERVICE
        </span>
      </div>
      <div className="w-full grid grid-cols-6 gap-[4rem] xs:gap-[1rem] py-[1.6rem] px-[3.2rem]">
        <div className="w-full col-start-2 col-span-4 xs:col-start-1 xs:col-span-6 inline-flex items-center justify-between header__container">
          <div className="logo">
            <Link to={"/"} className="text-display-xs text-white">
              <img src={logo && logo} alt="" className="max-w-[4rem]" />
            </Link>
          </div>
          <ul className="flex list-none items-center gap-[3.2rem] xs:gap-[1rem] header__menu">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="relative header__menu--item"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <NavLink
                  to={item.to}
                  className=" hover:text-light transition-all duration-300 text-md xs:text-xs font-medium capitalize p-[1rem] header__menu--link"
                >
                  {item.label}
                </NavLink>
                {item.children && openDropdown === index && (
                  <ul className="absolute top-[3rem] left-[-50%] bg-white shadow-lg rounded-[0.6rem] z-10 flex flex-col">
                    {item.children.map((child, childIndex) => (
                      <li key={childIndex} className="header__submenu--item">
                        <NavLink
                          to={child.to}
                          className="text-dark border-b border-gray-500 text-md min-w-[20rem] text-center xs:text-xs font-medium capitalize transition-all duration-300 p-[1rem] block hover:text-white hover:bg-dark"
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <button
            className="inline-flex items-center w-fit transition duration-200 px-[1rem] py-[0.8rem] border-b border-dark rounded-[0.6rem] text-xs text-light-active font-medium hover:text-light hover:border-light"
            onClick={toggleLanguage}
          >
            {language === "en" ? (
              <span className="inline-flex gap-[0.5rem] items-center">
                <VN
                  title="Vietnamese"
                  className="h-[2rem] w-[2rem] xs:h-[1.5rem] xs:w-[1.5rem]"
                />
                Vietnamese
              </span>
            ) : (
              <span className="inline-flex gap-[0.5rem] items-center">
                <US
                  title="United States"
                  className="h-[2rem] w-[2rem] xs:h-[1.5rem] xs:w-[1.5rem]"
                />
                English
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
