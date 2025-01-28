import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { useLoading } from "../../../context/LoadingContext";
import { getProducts } from "../../../utils/utils";
import "./products.scss";
import Card from "../../ui/Card/Card";
import Pagination from "../../ui/Pagination/Pagination";
const Products = () => {
  const { language } = useContext(AppContext);
  const { startLoading, stopLoading } = useLoading();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [priceFilter, setPriceFilter] = useState("asc");

  const categoryId = searchParams.get("category_id");
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    fetchProductsData();
  }, [language, categoryId, currentPage]);

  const fetchProductsData = async () => {
    startLoading(); // Bắt đầu loading
    try {
      const response = await getProducts({
        ...(categoryId ? { category_id: categoryId } : {}),
        page: currentPage,
      });

      if (response.status === 200) {
        setProducts(response.data.data);
        setMeta(response.data.meta);
      }
    } catch (error) {
      console.log("Failed to fetch products: ", error);
    } finally {
      stopLoading(); // Kết thúc loading, bất kể có lỗi hay không
    }
  };
  const sortedProducts = useMemo(() => {
    const parsePrice = (price) =>
      typeof price === "string" ? parseFloat(price.replace(/,/g, "")) : price;

    return [...products].sort((a, b) => {
      const priceA = parsePrice(a.price);
      const priceB = parsePrice(b.price);
      return priceFilter === "asc" ? priceA - priceB : priceB - priceA;
    });
  }, [products, priceFilter]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set("category_id", value);
    } else {
      newSearchParams.delete("category_id");
    }
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
  };

  const handlePriceFilterChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const handlePageChange = (newPage) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", newPage);
    setSearchParams(newSearchParams);
  };
  const handleProductClick = (productName) => {
    document.title = `${productName} - ${
      language === "vi" ? "Chi Tiết Sản Phẩm" : "Product Details"
    }`;
  };
  console.log(meta);

  // const title = [
  //   `${language === "vi" ? "Cơ Nhảy" : "Jump Cue"}`,
  //   `${language === "vi" ? "Cơ Phá" : "Break Cue"}`,
  //   `${language === "vi" ? "Cơ Đánh" : "Billard Cue"}`,
  //   `${language === "vi" ? "Phụ Kiện" : "Billiard Accessories"}`,
  // ];

  const title = [
    { 
      id: 8, 
      name: `${language === "vi" ? "Cơ Đánh" : "Billard Cue"}` 
    },
    { 
      id: 7, 
      name: `${language === "vi" ? "Cơ Nhảy" : "Jump Cue"}` 
    },
    { 
      id: 6, 
      name: `${language === "vi" ? "Cơ Phá" : "Break Cue"}` 
    },
    { 
      id: 10, 
      name: `${language === "vi" ? "Ngọn Carbon Fiber" : "Billiard Accessories"}` 
    },
    { 
      id: 9, 
      name: `${language === "vi" ? "Phụ Kiện" : "Billiard Accessories"}` 
    }
  ];
  return (
    <div className="w-full grid grid-cols-6 gap-[2rem] xs:gap-[1rem] px-[3.2rem] xs:px-[1rem] py-[2rem]">
      <main className="w-full col-start-2 col-span-4 flex flex-col gap-[2rem]">
        <section className="w-full flex flex-col gap-[1.6rem] py-[2rem] products">
          <div className="w-full inline-flex justify-between items-center">
            <div className="inline-flex gap-[1rem] items-center form-group">
              <label
                htmlFor="category"
                className="text-md text-dark font-medium"
              >
                {language === "vi" ? "Loại:" : "Category:"}
              </label>
              <select
                id="category"
                name="category_id"
                value={categoryId || ""}
                onChange={handleCategoryChange}
                className="text-sm font-semibold border border-gray-500 rounded-[0.6rem] p-[0.6rem] outline-none hover:cursor-pointer hover:border-gray-900 focus:border-gray-900"
              >
                <option value="">{language === "vi" ? "Tất Cả" : "All"}</option>
                {title.map((item) => (
                  <option key={item.name} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="inline-flex gap-[1rem] items-center form-group">
              <label htmlFor="price" className="text-md text-dark font-medium">
                {language === "vi" ? "Giá:" : "Price:"}
              </label>
              <select
                id="price"
                name="price"
                value={priceFilter}
                onChange={handlePriceFilterChange}
                className="text-sm font-semibold border border-gray-500 rounded-[0.6rem] p-[0.6rem] outline-none hover:cursor-pointer hover:border-gray-900 focus:border-gray-900"
              >
                <option value="asc">
                  {language === "vi" ? "Từ Thấp -> Cao" : "Low To High"}
                </option>
                <option value="desc">
                  {language === "vi" ? "Từ Cao -> Thấp" : "High To Low"}
                </option>
              </select>
            </div>
          </div>

          <div className="list-products mb-[2rem]">
            {sortedProducts.length > 0 &&
              sortedProducts.map((item) => (
                <Link to={`/products/${item.slug}`} key={item.id}>
                  <Card
                    url={item.main_image}
                    alt={item.name}
                    nameCard={item.name}
                    price={`${language === "vi" ? "Từ" : "From"} ${item.price} ${language === "vi" ? "đ" : "VND"}`}
                    onClick={() => handleProductClick(item.name)}
                  />
                </Link>
              ))}
          </div>

          {meta && meta.last_page > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={meta.last_page}
              onPageChange={handlePageChange}
              pageSize={meta.per_page}
              totalItems={meta.total}
            />
          )}
        </section>
      </main>
    </div>
  );
};
export default Products;
