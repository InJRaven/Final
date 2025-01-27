import React from "react";
import { Link } from "react-router-dom";
import { SiFacebook } from "react-icons/si";
import phone from "../../../assets/img/icon/phone.png";
import zalo from "../../../assets/img/icon/zalo.png";
import facebook from "../../../assets/img/icon/facebook.png";

import "./social.scss";
const Social = () => {
  // Trạng thái để lưu thông báo hiển thị

  return (
    <div className="fixed z-50 right-[1rem] bottom-[1rem] flex flex-col gap-4">
      {/* VIBER */}
      <Link
        to="tel:+84 389 9999"
        // Số điện thoại ví dụ
        className="cursor-pointer transition duration-300 transform hover:scale-110 hover:text-blue-500 relative social-link"
      >
        <img src={phone} alt="" />
      </Link>

      {/* FACEBOOK */}
      <Link
        to="https://www.facebook.com/anphanka"
        target="_blank"
        rel="noopener noreferrer"
        className="transition duration-300 transform hover:scale-110 hover:text-blue-500 social-link"
      >
        <img src={facebook} alt="" />
      </Link>

      {/* ZALO */}
      <Link
        to={"https://zalo.me/0843.89.9999"}
        className="cursor-pointer transition duration-300 transform hover:scale-110 hover:text-green-500 relative social-link"
      >
        <img src={zalo} alt="" />
      </Link>
    </div>
  );
};

export default Social;
