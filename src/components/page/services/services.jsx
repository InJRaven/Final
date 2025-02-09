import { useContext, useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { AppContext } from "../../../context/AppContext";
import { getServices } from "../../../utils/utils";
import { useLoading } from "../../../context/LoadingContext";
import "./services.scss";
import DangerouslySetInnerHTML from "../../ui/DangerouslySetInnerHTML/DangerouslySetInnerHTML";
const Services = () => {
  const { language } = useContext(AppContext);
  const { startLoading, stopLoading } = useLoading();

  const [content, setContext] = useState({});
  useEffect(() => {
    fetchServicesData();
  }, [language]);
  const fetchServicesData = async () => {
    startLoading();
    try {
      const response = await getServices();
      if (response.status === 200) {
        setContext(response.data.data);
      }
    } catch (error) {
      console.log("Faild Fetch Data Services: ", error);
    } finally {
      stopLoading();
    }
  };

  const sanitizedHtml =
    content && content[0]?.content
      ? DOMPurify.sanitize(content[0].content)
      : "";

  return (
    <div className="w-full col-start-2 col-span-4 flex flex-col gap-[2rem]">
      <DangerouslySetInnerHTML content={sanitizedHtml} className='services-content' />
    </div>
  );
};
export default Services;
