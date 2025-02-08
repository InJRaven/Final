import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { SettingContext } from "../../../context/SettingContext";
import { getRelated } from "../../../utils/utils";
import Advertisements from "./advertisements/Advertisements";
import Section from "./section/section";
import Banner from "./banner/banner";
import { useLoading } from "../../../context/LoadingContext";

const Home = () => {
  const { settings } = useContext(SettingContext);
  const { language } = useContext(AppContext);
  const { startLoading, stopLoading } = useLoading();
  const [related, setRelated] = useState([]);
  const advertisements = useMemo(
    () => settings?.advertisements || [],
    [settings]
  );
  const banners = useMemo(() => settings?.banners || [], [settings]);

  useEffect(() => {
    const fetchData = async () => {
      startLoading(); // Hiển thị trạng thái loading
      try {
        await fetchRelatedData(); // Chỉ cần gọi một lần API
      } catch (error) {
        console.log("Fetch Error: ", error);
      } finally {
        stopLoading(); // Ẩn trạng thái loading
      }
    };
  
    fetchData();
  }, [language]);
  const fetchRelatedData = async () => {
    try {
      const response = await getRelated();
      if (response.status === 200) {
        const order = [8, 7, 6, 10, 9]; // Thứ tự ID mong muốn
        const sortedRelated = order
          .map((id) =>
            response.data.data.find((item) => item.category_id === id)
          )
          .filter((item) => item); // Loại bỏ các mục không tồn tại
        setRelated(sortedRelated); // Cập nhật `related` đã được sắp xếp
      }
    } catch (error) {
      console.log("Fetch Related Error", error);
    }
  };
  

  return (
    <>
      <div className="w-full col-start-2 col-end-6 flex flex-col gap-[2rem]">
        {banners && <Banner banners={banners} />}
        {related &&
          related.map((item) => {
            return (
              <Section
                key={item.category_id}
                language={language}
                title={item.category_name}
                typeButton="link"
                link={`/products?category_id=${item.category_id}`}
                textButton={`${language === "vi" ? "Xem Tất Cả" : "See All"}`}
                iconButtonRight={<i className="ki-filled ki-arrow-right" />}
                data={item.products}
              />
            );
          })}
      </div>

      <div className="col-start-6 col-end-7 h-fit sticky top-4">
        {advertisements && <Advertisements advertisements={advertisements} />}
      </div>
    </>
  );
};
export default Home;
