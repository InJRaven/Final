import img from "../../../assets/img/last.jpg";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { useLoading } from "../../../context/LoadingContext";

import { PiUserCircleFill, PiPhoneDisconnect } from "react-icons/pi";
import { HiOutlineMail } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
const Contact = () => {
  const { language } = useContext(AppContext);
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => {
      console.log("Stop Loading");
      stopLoading();
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="col-start-1 col-end-7 w-full flex flex-col gap-[2rem] padding-page">
      <div className="w-full rounded-[0.6rem] h-[70vh] flex flex-col items-center justify-center gap-[2.4rem]">
        <div className="flex items-center justify-center gap-[1.8rem]">
          <div className="flex flex-row gap-[2rem] w-full">
            <div className="w-[49.5rem] h-[49.5rem] rounded-[50%]">
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover rounded-[50%]"
              />
            </div>

            <div className="flex flex-col gap-[1rem] justify-center">
              <h2 className="text-display-md font-bold mb-[2rem]">
                {language === "vi"
                  ? "Thông Tin Liên Hệ"
                  : "Contact Information"}
              </h2>
              <div className="flex flex-row gap-[2rem] items-center">
                <PiUserCircleFill className="text-xl " />
                <span className="text-xl text-center font-bold text-gray-900">
                  {language === "vi" ? "Phan Công An" : "Darius Phan"}
                </span>
              </div>

              <div className="flex flex-row gap-[2rem] items-center">
                <PiPhoneDisconnect className="text-xl text-green-700" />
                <span className="text-lg font-semibold text-gray-900">
                  {language === "vi" ? " 0843.89.9999" : " +84 843899999"}
                </span>
              </div>

              <div className="flex flex-row gap-[2rem] items-center">
                <HiOutlineMail className="text-xl text-red-700" />
                <span className="text-xl font-semibold text-gray-900">
                  dariusphancues89@gmail.com
                </span>
              </div>

              <div className="flex flex-row gap-[2rem] items-center">
                <SlLocationPin className="text-xl text-blue-700" />
                <span className="text-lg font-semibold text-gray-900 w-[40rem]">
                  {language === "vi"
                    ? "Số nhà 27, đường Nguyễn Huy Tự, phường Hưng Trí, thị xã Kỳ Anh, Hà Tĩnh"
                    : "27 Nguyen Huy Tu street, Hung Tri ward, Ky Anh city, Ha Tinh province, Vietnam"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
