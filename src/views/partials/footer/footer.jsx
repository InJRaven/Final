import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
const Footer = () => {
  const { language } = useContext(AppContext);

  const company = [
    {
      name: "Darius Phan Cues and Repair Service",
      address:
        "Số nhà 27, đường Nguyễn Huy Tự, phường Hưng Trí, thị xã Kỳ Anh, Hà Tĩnh",
      phoneNumber: "0843.89.9999",
      email: "dariusphancues89@gmail.com",
      working: "8:00h - 18:00h (T2 - CN)",
      website: "Dariusphan.com",
    },
    {
      name: "Darius Phan Cues and Repair Service",
      address:
        "27 Nguyen Huy Tu street, Hung Tri ward, Ky Anh city, Ha Tinh province, Vietnam",
      phoneNumber: "+84 843899999",
      email: "dariusphancues89@gmail.com",
      working: "8:00am - 6:00pm (Mon - Sun)",
      website: "Dariusphan.com",
    },
  ];

  const selectedCompany = language === "vi" ? company[0] : company[1];
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
