import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useSearchParams } from "react-router-dom";
import { getCategoriesGallery, getGallery } from "../../../utils/utils";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Pagination from "../../ui/Pagination/Pagination";

const Gallery = () => {
  const { language } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [images, setImages] = useState([]);
  const [meta, setMeta] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const modalRef = useRef(null); // Ref cho modal
  const selectedCategory = searchParams.get("category") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const categoryTitles = {
    "co-pha": { vi: "Cơ Phá", en: "Break Cue" },
    "co-nhay": { vi: "Cơ Nhảy", en: "Jump Cue" },
    "co-danh": { vi: "Cơ Đánh", en: "Billard Cue" },
    "phu-kien": { vi: "Phụ Kiện", en: "Billiard Accessories" },
  };

  useEffect(() => {
    fetchGalleriesData();
  }, [selectedCategory, currentPage, language]);

  useEffect(() => {
    fetchCategoriesData();
  }, [language]);

  // Lắng nghe phím ESC trên modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    const modalElement = modalRef.current;

    if (isModalVisible && modalElement) {
      modalElement.addEventListener("keydown", handleKeyDown);
      modalElement.focus(); // Đảm bảo modal nhận focus để lắng nghe sự kiện
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [isModalVisible]);

  const fetchGalleriesData = async () => {
    try {
      const response = await getGallery({
        ...(selectedCategory ? { category: selectedCategory } : {}),
        page: currentPage,
      });

      if (response.status === 200) {
        setImages(response.data.data);
        setMeta(response.data.meta);
      }
    } catch (error) {
      console.log("Failed Fetch Galleries: ", error);
    }
  };

  const fetchCategoriesData = async () => {
    try {
      const response = await getCategoriesGallery();

      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.log("Failed Fetch Categories Galleries: ", error);
    }
  };

  const handlePageChange = useCallback(
    (page) => {
      const params = new URLSearchParams(searchParams);
      if (selectedCategory) {
        params.set("category", selectedCategory);
      } else {
        params.delete("category");
      }
      params.set("page", page);
      setSearchParams(params);
    },
    [setSearchParams, searchParams, selectedCategory]
  );

  const handleFilter = useCallback(
    (category) => {
      if (category) {
        setSearchParams({ category, page: "1" });
      } else {
        const params = new URLSearchParams(searchParams);
        params.delete("category");
        params.set("page", "1");
        setSearchParams(params);
      }
    },
    [setSearchParams, searchParams]
  );

  const openModal = useCallback((image) => {
    setSelectedImage(image);
    setTimeout(() => setIsModalVisible(true), 10);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
    setTimeout(() => setSelectedImage(null), 300);
  }, []);

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        closeModal();
      }
    },
    [closeModal]
  );

  return (
    <div className="w-full grid grid-cols-6 gap-[2rem] xs:gap-[1rem] px-[3.2rem] xs:px-[1rem] py-[2rem]">
      <main className="w-full col-start-2 col-span-4 flex flex-col gap-[2rem]">
        <section className="w-full flex flex-col gap-[1.6rem] py-[2rem] gallery">
          {/* Dynamic Filter Buttons */}
          <div className="inline-flex gap-[1.6rem] items-stretch w-full">
            <button
              className={`w-full text-sm border border-gray-500 transition duration-200 px-[1rem] py-[0.6rem] rounded-[0.6rem] font-medium hover:border-gray-900 hover:shadow-button ${
                !selectedCategory ? "bg-gray-900 text-white" : ""
              }`}
              onClick={() => handleFilter("")}
            >
              {language === "vi" ? "Tất Cả" : "All"}
            </button>
            {Object.entries(categoryTitles).map(([category, titles]) => (
              <button
                key={category}
                className={`w-full text-sm border border-gray-500 transition duration-200 px-[1rem] py-[0.6rem] rounded-[0.6rem] font-medium hover:border-gray-900 hover:shadow-button ${
                  selectedCategory === category ? "bg-gray-900 text-white" : ""
                }`}
                onClick={() => handleFilter(category)}
              >
                {titles[language]}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter="10px">
              {images.map((item) => (
                <img
                  key={item.id}
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-auto rounded-[0.6rem] cursor-pointer mb-[2rem]"
                  onClick={() => openModal(item.image_url)}
                  loading="lazy"
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
          {meta && meta.last_page > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={meta.last_page}
              onPageChange={handlePageChange}
              pageSize={meta.per_page}
              totalItems={meta.total}
            />
          )}
          {/* Modal */}
          {selectedImage && (
            <div
              ref={modalRef}
              tabIndex={-1} // Đảm bảo nhận focus
              className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300 modal-overlay ${
                isModalVisible ? "opacity-100" : "opacity-0"
              }`}
              onClick={handleOverlayClick}
            >
              <div
                className={`relative transform transition-transform duration-300 ${
                  isModalVisible ? "scale-100" : "scale-50"
                }`}
              >
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="max-w-full max-h-screen rounded-[0.6rem]"
                />
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
export default Gallery;