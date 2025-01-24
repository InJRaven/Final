import { useContext, useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { AppContext } from "../../../context/AppContext";
import { getServices } from "../../../utils/utils";
import "./services.scss";
const Services = () => {
  const { language } = useContext(AppContext);
  const [content, setContext] = useState({});
  useEffect(() => {
    fetchServicesData();
  }, [language]);
  const fetchServicesData = async () => {
    try {
      const response = await getServices();
      if (response.status === 200) {
        setContext(response.data.data);
      }
    } catch (error) {
      console.log("Faild Fetch Data Services: ", error);
    }
  };


  const sanitizedHtml =
    content && content[0]?.content
      ? DOMPurify.sanitize(content[0].content)
      : "";

  return (
    <div className="w-full grid grid-cols-6 gap-[2rem] xs:gap-[1rem] px-[3.2rem] xs:px-[1rem] py-[2rem]">
      <div className="w-full col-start-2 col-span-4 flex flex-col gap-[2rem]">
        <div
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          className="p-[1.6rem] flex flex-col gap-[1.6rem] !text-md !font-medium break-words"
        />
      </div>
    </div>
  );
};
export default Services;
