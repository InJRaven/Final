import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { SettingContext } from "../../../context/SettingContext";
import { getMenu, getRelated } from "../../../utils/utils";
import SideBar from "../../../views/partials/sidebar/sidebar";
import Advertisements from "./advertisements/Advertisements";
import Section from "./section/Section";
import Banner from "./banner/Banner";

const Home = () => {
  const { settings } = useContext(SettingContext);
  const { language } = useContext(AppContext);
  const [related, setRelated] = useState([]);
  const [menu, setMenu] = useState([]);
  const advertisements = useMemo(
    () => settings?.advertisements || [],
    [settings]
  );
  const banners = useMemo(() => settings?.banners || [], [settings]);

  useEffect(() => {
    fetchRelatedData();
    fetchMenuData();
  }, [language]);

  const fetchRelatedData = async () => {
    try {
      const response = await getRelated();
      if (response.status === 200) {
        setRelated(response.data.data);
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
  const title = [
    `${language === "vi" ? "Cơ Phá" : "Break Cue"}`,
    `${language === "vi" ? "Cơ Nhảy" : "Jump Cue"}`,
    `${language === "vi" ? "Cơ Đánh" : "Billard Cue"}`,
    `${language === "vi" ? "Phụ Kiện" : "Billiard Accessories"}`,
  ];

  console.log(menu)
  return (
    <div className="w-full grid grid-cols-6 gap-[2rem] xs:gap-[1rem] px-[3.2rem] xs:px-[1rem] py-[2rem]">
      {menu && <SideBar menu={menu} />}
      <div className="w-full col-start-2 col-span-4 flex flex-col gap-[2rem]">
        {banners && <Banner banners={banners} />}
        <div className="w-full flex flex-col items-center container">
          {related &&
            related.map((item, index) => {
              return (
                <Section
                  key={item.category_id}
                  language={language}
                  title={title[index]}
                  typeButton="link"
                  link={`/products?category_id=${item.category_id}`}
                  textButton={`${language === "vi" ? "Xem Tất Cả" : "See All"}`}
                  iconButtonRight={<i className="ki-filled ki-arrow-right" />}
                  data={item.products}
                />
              );
            })}
        </div>
      </div>

      {advertisements && <Advertisements advertisements={advertisements} />}
    </div>
  );
};
export default Home;
