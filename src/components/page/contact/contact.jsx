import img from "../../../assets/img/last.jpg";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { useLoading } from "../../../context/LoadingContext";

import { PiUserCircleFill , PiPhoneDisconnect } from "react-icons/pi";
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
    <div className="w-full flex flex-col gap-[2rem]">
      <div className="w-full rounded-[0.6rem] h-[70vh] bg-gray-100 flex flex-col items-center justify-center gap-[2.4rem]">
        <div className="flex flex-col items-center justify-center gap-[1.8rem]">
          <h2 className="text-display-md text-center font-bold mb-[2rem]">
            {language === "vi" ? "Thông Tin Liên Hệ" : "Contact Information"}
          </h2>

          <div className="flex flex-row gap-[2rem] w-full">
            <div className="w-[30rem] h-[30rem] rounded-[50%]">
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover rounded-[50%] "
              />
            </div>

            <div className="flex flex-col gap-[1rem] justify-center">
              <div className="flex flex-row gap-[2rem] items-center">
                <PiUserCircleFill  className="text-xl " />
                <span className="text-xl text-center font-bold text-gray-900">
                  Phan Công An
                </span>
              </div>

              <div className="flex flex-row gap-[2rem] items-center">
                <PiPhoneDisconnect className="text-xl text-green-700" />
                <span className="text-lg font-semibold text-gray-900">
                  +84 389 9999
                </span>
              </div>

              <div className="flex flex-row gap-[2rem] items-center">
                <HiOutlineMail className="text-xl text-red-700" />
                <span className="text-xl font-semibold text-gray-900">
                  Dariusphancues89@gmail.com
                </span>
              </div>

              <div className="flex flex-row gap-[2rem] items-center">
                <SlLocationPin className="text-xl text-blue-700" />
                <span className="text-lg font-semibold text-gray-900 w-[40rem]">
                  {language === "vi"
                    ? "Số 27, Đường Nguyễn Huy Tự, Phường Hưng Trí, Thị Xã Kỳ Anh, Hà Tĩnh"
                    : "No. 27 Nguyen Huy Tu Street, Hung Tri Ward, Ky Anh Town, Ha Tinh Province, Vietnam"}
                </span>
              </div>
            </div>
          </div>

          {/* <div>
            <img src={img} alt="" className="w-[35rem] rounded-md" />
          </div>

          <div className="flex flex-col gap-[1rem] w-[50rem]">
            <h2 className="text-display-sm text-center font-bold mb-[2rem]">
              {language === "vi" ? "Thông Tin Liên Hệ" : "Contact Information"}
            </h2>
            <h3 className="text-display-xs text-center font-bold">
              Phan Công An
            </h3>
            <span className="text-lg font-bold">
              {language === "vi" ? "SĐT" : "TelePhone"}:{" "}
              <span className="font-semibold text-gray-800">+84 389 9999</span>
            </span>
            <span className="text-lg font-bold w-[50rem]">
              Email:{" "}
              <span className="font-semibold text-gray-800">
                Dariusphancues89@gmail.com
              </span>
            </span>
            <div className="flex gap-[0.5rem]">
              <span className="text-lg font-bold break-words">
                {language === "vi" ? "Địa Chỉ" : "Address"}:{" "}
              </span>
              <p className="text-lg font-semibold text-gray-800 w-[35rem]">
                {language === "vi"
                  ? "Số 27, Đường Nguyễn Huy Tự, Phường Hưng Trí, Thị Xã Kỳ Anh, Hà Tĩnh"
                  : "No. 27 Nguyen Huy Tu Street, Hung Tri Ward, Ky Anh Town, Ha Tinh Province, Vietnam"}
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default Contact;
