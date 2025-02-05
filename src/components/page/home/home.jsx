import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { SettingContext } from "../../../context/SettingContext";
import { getMenu, getRelated } from "../../../utils/utils";
import SideBar from "../../../views/partials/sidebar/sidebar";
import Advertisements from "./advertisements/Advertisements";
import Section from "./section/section";
import Banner from "./banner/banner";
import { useLoading } from "../../../context/LoadingContext";

const Home = () => {
  const { settings } = useContext(SettingContext);
  const { language } = useContext(AppContext);
  const { startLoading, stopLoading } = useLoading();
  const [related, setRelated] = useState([]);
  const [menu, setMenu] = useState([]);
  const advertisements = useMemo(
    () => settings?.advertisements || [],
    [settings]
  );
  const banners = useMemo(() => settings?.banners || [], [settings]);

  useEffect(() => {
    const fetchData = async () => {
      startLoading(); // Hiển thị trạng thái loading
      try {
        await Promise.all([fetchRelatedData(), fetchMenuData()]); // Chờ cả hai API hoàn tất
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
  const fetchMenuData = async () => {
    try {
      const response = await getMenu();
      if (response.status === 200) {
        setMenu(response.data.data);
      }
    } catch (error) {
      console.log("Fetch Related Error", error);
    }
  };

  return (
    <div className="relative w-full grid grid-cols-6 gap-[2rem] xs:gap-[1rem] px-[3rem] xs:px-[1rem] py-[2rem]">
      <div
        className="col-start-1 col-end-2 h-fit sticky top-4" // Sidebar luôn cố định trong viewport
      >
        {menu && <SideBar menu={menu} />}
      </div>
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
    </div>
  );
};
export default Home;
