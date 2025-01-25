import { FaLanguage, FaSquarePhoneFlip } from "react-icons/fa6";
import img from "../../../assets/img/last.jpg";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { useLoading } from "../../../context/LoadingContext";
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
        <div className="flex flex-row items-center justify-center gap-[1.8rem]">
          <div>
            <img src={img} alt="" className="w-[35rem]" />
          </div>

          <div className="flex flex-col  gap-[1rem] w-[40rem]">
            <h2 className="text-lg text-center font-bold">
              {language === "vi" ? "Thông Tin Liên Hệ" : "Contact Information"}
            </h2>
            <h3 className="text-display-xs  text-center font-bold">
              Phan Công Anh
            </h3>
            <span className="text-lg text-center font-bold">
              {language === "vi" ? "SĐT" : "TelePhone"}:{" "}
              <span className="font-semibold text-gray-800">+84 389 9999</span>
            </span>
            <span className="text-lg text-center font-bold">
              Email:{" "}
              <span className="font-semibold text-gray-800">
                Dariusphancues89@gmail.com
              </span>
            </span>
            <span className="text-lg text-center font-bold break-words ">
              {language === "vi" ? "Địa Chỉ" : "Address"}:{" "}
              <span className="font-semibold text-gray-800">
                {language === "vi"
                  ? "Số 27, Đường Nguyễn Huy Tự, Phường Hưng Trí, Thị Xã Kỳ Anh, Hà Tĩnh"
                  : "No. 27 Nguyen Huy Tu Street, Hung Tri Ward, Ky Anh Town, Ha Tinh Province, Vietnam"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
