import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useSearchParams } from "react-router-dom";
import { getCategoriesGallery, getGallery } from "../../../utils/utils";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Pagination from "../../ui/Pagination/Pagination";
import { useLoading } from "../../../context/LoadingContext";

const Gallery = () => {
  const { language } = useContext(AppContext);
  const { startLoading, stopLoading } = useLoading();

  const [searchParams, setSearchParams] = useSearchParams();
  const [images, setImages] = useState([]);
  const [meta, setMeta] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [isImagesLoading, setIsImagesLoading] = useState(true);

  const modalRef = useRef(null);
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

  // Hàm wrapper để tải dữ liệu với loading
  const fetchDataWithLoading = useCallback(
    async (fetchFunc, setData, setLoading) => {
      setLoading(true);
      startLoading();
      try {
        const response = await fetchFunc();
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );

  const fetchGalleriesData = useCallback(() => {
    fetchDataWithLoading(
      () =>
        getGallery({
          ...(selectedCategory ? { category: selectedCategory } : {}),
          page: currentPage,
        }),
      (data) => {
        setImages(data.data);
        setMeta(data.meta);
      },
      setIsImagesLoading
    );
  }, [fetchDataWithLoading, selectedCategory, currentPage]);

  const fetchCategoriesData = useCallback(() => {
    fetchDataWithLoading(
      getCategoriesGallery,
      setCategories,
      setIsCategoriesLoading
    );
  }, [fetchDataWithLoading]);

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
      const params = new URLSearchParams();
      if (category) {
        params.set("category", category);
      }
      params.set("page", "1");
      setSearchParams(params);
    },
    [setSearchParams]
  );

  const openModal = useCallback((image) => {
    setSelectedImage(image);
    setTimeout(() => setIsModalVisible(true), 10);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
    setTimeout(() => setSelectedImage(null), 300);
  }, []);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    const modalElement = modalRef.current;
    if (isModalVisible && modalElement) {
      modalElement.focus(); // Đảm bảo modal nhận focus
      modalElement.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [isModalVisible, closeModal]);
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
            {isCategoriesLoading ? (
              <p>Loading categories...</p>
            ) : (
              <>
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
                      selectedCategory === category
                        ? "bg-gray-900 text-white"
                        : ""
                    }`}
                    onClick={() => handleFilter(category)}
                  >
                    {titles[language]}
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Image Grid */}
          {isImagesLoading ? (
            <p>Loading images...</p>
          ) : (
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
          )}
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
              tabIndex={-1}
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
