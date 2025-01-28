import { useContext, useEffect, useState } from "react";
import {
  FacebookIcon,
  MessageIcon,
  PhoneIcon,
  YoutubeIcon,
} from "../../../components/ui/Icon/Icon";
import { AppContext } from "../../../context/AppContext";
const Footer = () => {
  const { language } = useContext(AppContext);

  const company = [
    {
      name: "Darius Phan Cues and Repair Service",
      address:
        "Số Nhà 27, đường Nguyễn Huy Tự, phường Hưng Trí, thị xã Kỳ Anh, Hà Tĩnh",
      phoneNumber: "0843.89.9999",
      email: "dariusphancues89@gmail.com",
      working: "8:00h - 18:00h (T2 - CN)",
      website: "Dariusphan.com",
    },
    {
      name: "Darius Phan Cues and Repair Service",
      address:
        "No. 27 Nguyen Huy Tu street, Hung Tri ward, Ky Anh city, Ha Tinh province, Vietnam",
      phoneNumber: "+84 843899999",
      email: "dariusphancues89@gmail.com",
      working: "8:00am - 6:00pm (Mon - Sun)",
      website: "Dariusphan.com",
    },
  ];
  const introduction = [
    {
      title: "Giới Thiệu",
      founder: "Sáng Lập",
      workshop: "Xưởng Sản Xuất",
      personal: " Nhân Sự Công Ty",
      recruitment: "Tuyển Dụng Nhân Sự",
      process: "Quy Trình Làm Việc",
      channel: "Kênh Youtube",
    },
    {
      title: "Introduction",
      founder: "Founder",
      workshop: "Production Workshop",
      personal: "Company Personnel",
      recruitment: "Recruitment",
      process: "Working Process",
      channel: "YouTube Channel",
    },
  ];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1000); // Simulate loading time
    return () => clearTimeout(timeout);
  }, []);
  const selectedCompany = language === "vi" ? company[0] : company[1];
  const selectedIntroduction =
    language === "vi" ? introduction[0] : introduction[1];
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="col-start-1 col-end-2 row-start-1 row-end-2 footer__container--item">
          <h4 className="text-lg text-light font-bold title">
            {selectedCompany.name}
          </h4>
          <div className="flex flex-col gap-[1rem] information">
            <p className="text-gray-500 text-md break-words">
              <span className="text-light font-bold">
                {language === "vi" ? "Địa Chỉ:" : "Address:"}
              </span>{" "}
              {selectedCompany.address}
            </p>
            <p className="text-gray-500 text-md break-words">
              <span className="text-light font-bold">
                {language === "vi" ? "Điện thoại:" : "Tel:"}
              </span>{" "}
              {selectedCompany.phoneNumber}
            </p>
            <p className="text-gray-500 text-md break-words">
              <span className="text-light font-bold">Email:</span>{" "}
              {selectedCompany.email}
            </p>
            <p className="text-gray-500 text-md break-words">
              <span className="text-light font-bold">
                {language === "vi" ? "Thời gian làm việc:" : "Working time:"}
              </span>{" "}
              {selectedCompany.working}
            </p>
            <p className="text-gray-500 text-md break-words">
              <span className="text-light font-bold">Website:</span>{" "}
              {selectedCompany.website}
            </p>
          </div>
        </div>

        {/* <div className="col-start-2 col-end-3 row-start-1 row-end-2 footer__container--item">
          <h4 className="text-lg text-light font-bold title grid grid-cols-1">
            {selectedIntroduction.title}
          </h4>
          <div className="flex flex-col gap-[1rem] information">
            <p className="text-gray-500 text-md break-words">
              {selectedIntroduction.founder}
            </p>
            <p className="text-gray-500 text-md break-words">
              {selectedIntroduction.workshop}
            </p>
            <p className="text-gray-500 text-md break-words">
              {selectedIntroduction.personal}
            </p>
            <p className="text-gray-500 text-md break-words">
              {selectedIntroduction.recruitment}
            </p>
            <p className="text-gray-500 text-md break-words">
              {selectedIntroduction.process}
            </p>
            <p className="text-gray-500 text-md break-words">
              {selectedIntroduction.channel}
            </p>
            <div className="social">
              <span className="w-[3.2rem] h-[3.2rem] rounded-[5rem] flex items-center justify-center bg-blue-500">
                <FacebookIcon />
              </span>
              <span className="w-[3.2rem] h-[3.2rem] rounded-[5rem] flex items-center justify-center bg-light-dark">
                <MessageIcon />
              </span>
              <span className="w-[3.2rem] h-[3.2rem] rounded-[5rem] flex items-center justify-center bg-green-500">
                <PhoneIcon />
              </span>
              <span className="w-[3.2rem] h-[3.2rem] rounded-[5rem] flex items-center justify-center bg-red-500">
                <YoutubeIcon />
              </span>
            </div>
          </div>
        </div> */}

        <div className="col-start-2 col-end-5 row-start-1 row-end-2 footer__container--item max-h-[30rem]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3793.169746533603!2d106.29606059999999!3d18.063694899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313889413939fe4d%3A0x6702b91b94dc7df1!2sDariusPhan%20Cues%20%26%20Repair%20Service!5e0!3m2!1svi!2s!4v1737713879546!5m2!1svi!2s"
            width={600}
            height={450}
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full object-container"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
