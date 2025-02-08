import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import DOMPurify from "dompurify";
import Card from "../../ui/Card/Card";

import { getRelated, getSlugProduct } from "../../../utils/utils";

import "./slug.scss";
import { useDynamicHelmet } from "../../../context/DynamicHelmetContext";
import { useLoading } from "../../../context/LoadingContext";
const Slug = () => {
  const { language } = useContext(AppContext);
  const { startLoading, stopLoading } = useLoading();
  const { slug } = useParams();
  const { setTitle, setMetaTag } = useDynamicHelmet();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [newRelated, setNewRelated] = useState([]);
  const [selectedPreview, setSelectedPreview] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      startLoading();
      try {
        const [productResponse, relatedResponse] = await Promise.all([
          getSlugProduct(slug),
          getRelated(),
        ]);

        if (productResponse.status === 200) {
          setProduct(productResponse.data.data);
          setTitle(`${productResponse.data.data.name}`);
          setMetaTag({
            ogTitle: `${productResponse.data.data.name}`,
            ogImage: `${productResponse.data.data.main_image}`,
          });
          setSelectedPreview(productResponse.data.data.images[0]?.path || "");
        }

        if (relatedResponse.status === 200) {
          setRelated(relatedResponse.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setTitle("Error Loading Product");
      } finally {
        stopLoading();
      }
    };

    fetchData();
  }, [slug, language, setTitle, setMetaTag]);
  const images = useMemo(() => product?.images || [], [product]);

  const categoryId = useMemo(() => product?.category?.id || "", [product]);
  useEffect(() => {
    if (images.length > 0) {
      setSelectedPreview(images[0].path);
    }
  }, [images]);
  useEffect(() => {
    if (categoryId && Array.isArray(related)) {
      // Filter and map the related products by category_id
      const filteredRelated = related
        .filter((item) => item.category_id === categoryId)
        .flatMap((item) => item.products || []); // Ensure item.products is an array

      setNewRelated(filteredRelated); // Update related products state
    }
  }, [categoryId, related]);
  const short_description = useMemo(
    () => DOMPurify.sanitize(product?.short_description || ""),
    [product]
  );
  const description = useMemo(
    () => DOMPurify.sanitize(product?.description || ""),
    [product]
  );

  const handlePreviewClick = (path) => {
    setSelectedPreview(path);
  };
  return (
    <div className="col-start-1 col-end-7 w-full flex flex-col gap-[2rem]">
      <section className="rol-start-2 grid grid-cols-6 gap-[4rem] py-[2rem] bg-gray-200">
        <nav
          className="col-start-2 col-span-4 px-[2rem] gap breadcrumb"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center justify-start gap-[0.6rem] breadcrumb__menu">
            <li className="breadcrumb__menu--item">
              <Link to="/" className="!text-md breadcrumb__menu--link">
                {language === "vi" ? "Trang Chủ" : "Home"}
              </Link>
            </li>
            <li className="gap-[0.6rem] breadcrumb__menu--item">
              <span className="flex items-center justify-center text-xs font-bold text-gray-700 icon">
                <i className="ki-duotone ki-right" />
              </span>
              <Link to="/products" className="!text-md breadcrumb__menu--link">
                {language === "vi" ? "Sản Phẩm" : "Products"}
              </Link>
            </li>
            <li className="gap-[0.6rem] breadcrumb__menu--item">
              <span className="flex items-center justify-center text-xs font-bold text-gray-700 icon">
                <i className="ki-duotone ki-right" />
              </span>
              <span className="!text-md breadcrumb__menu--link">
                {product?.name}
              </span>
            </li>
          </ol>
        </nav>
      </section>
      <div className="w-full grid grid-cols-6 gap-[2rem] xs:gap-[1rem] px-[3.2rem] xs:px-[1rem] py-[2rem]">
        <div className="w-full col-start-2 col-span-4 flex flex-col gap-[2rem]">
          <section className="grid grid-cols-[_0.6fr_0.5fr] gap-[3rem] product">
            <div className="col-span-1 row-span-1 grid gap-[1rem] relative product__preview">
              <div className="w-full aspect-square p-[0.5rem] bg-white shadow-card rounded-[0.6rem] border-[2px] border-gray-300 product__img">
                <img
                  src={selectedPreview}
                  alt="Selected preview"
                  className="w-full aspect-square object-cover"
                />
              </div>
              <Swiper
                modules={[Autoplay]}
                spaceBetween={10}
                slidesPerView={4}
                loop={!!images.length} // Loop only if images exist
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                className="w-full aspect-[16/3] relative group__img"
                onSlideChange={(swiper) => {
                  if (images.length) {
                    const currentImage =
                      images[swiper.realIndex % images.length];
                    if (currentImage?.path !== selectedPreview) {
                      setSelectedPreview(currentImage?.path || "");
                    }
                  }
                }}
              >
                {images.map((item) => (
                  <SwiperSlide key={item.path}>
                    <div
                      className={`w-full h-full bg-gray-500 transition duration-200 border-[3px] ${
                        selectedPreview === item.path
                          ? "border-gray-900"
                          : "border-transparent"
                      } group__img--item`}
                      onClick={() => handlePreviewClick(item.path)}
                    >
                      <img
                        src={item.path}
                        alt="Thumbnail"
                        className="w-full h-full aspect-square object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="col-span-2 col-start-2 flex flex-col gap-[1.2rem] p-[0.5rem] rounded-[0.6rem] product__information">
              <h2 className="gap-[1rem] font-bold text-display-sm break-words">
                {product?.name}
              </h2>
              <h4 className="text-xl text-red-600 font-bold mb-[0.5rem]">
                {language === "vi" ? "Từ" : "From"} {product?.price}
                {language === "vi" ? "₫" : "VND"}
              </h4>
              <span className="w-full h-[1px] bg-gray-900"></span>
              <div
                dangerouslySetInnerHTML={{ __html: short_description }}
                className="text-md break-words mt-[0.5rem]"
              />
            </div>
          </section>
          <section className="w-full flex flex-col gap-[2rem] items-stretch detail__description">
            <div className="border-b-2 border-gray-900">
              <span className="text-md font-medium uppercase bg-gray-900 float-start text-light px-[1.2rem] py-[0.8rem]">
                {language === "vi" ? "Mô Tả Sản Phẩm" : "Description"}
              </span>
            </div>
            <div className="box">
              <div
                className="text-md text-dark leading-[3rem]"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </section>
          <section className="py-[1.6rem] flex flex-col gap-[3rem]">
            <h2 className="uppercase text-display-sm font-bold">
              {language === "vi" ? "Sản Phẩm Liên Quan" : "Related Products"}
            </h2>
            <div className="grid grid-cols-4 md:grid-cols-2 gap-[2rem] more-product">
              {newRelated.map((item) => (
                <Link to={`/products/${item.slug}`} key={item.slug}>
                  <Card
                    url={item.main_image}
                    alt={item.name}
                    nameCard={item.name}
                    price={`${language === "vi" ? "Từ" : "From"} ${item.price}${
                      language === "vi" ? "₫" : "VND"
                    }`}
                  />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Slug;
