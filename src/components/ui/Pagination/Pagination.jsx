import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  totalItems,
}) => {
  if (totalPages <= 1) return null; // Không hiển thị nếu chỉ có 1 trang

  // Tạo danh sách các trang hiển thị
  const getPaginationItems = () => {
    const pages = [];
    const maxVisible = 3; // Số trang hiển thị ở đầu và cuối

    // Thêm các trang đầu tiên
    for (let i = 1; i <= Math.min(maxVisible, totalPages); i++) {
      pages.push(i);
    }

    // Thêm các trang cuối cùng
    for (
      let i = Math.max(totalPages - maxVisible + 1, 1);
      i <= totalPages;
      i++
    ) {
      pages.push(i);
    }

    // Thêm trang xung quanh trang hiện tại
    if (currentPage > maxVisible + 1) {
      pages.push("...");
    }

    if (
      currentPage > maxVisible &&
      currentPage < totalPages - maxVisible + 1
    ) {
      pages.push(currentPage - 1, currentPage, currentPage + 1);
    }

    if (currentPage < totalPages - maxVisible) {
      pages.push("...");
    }

    // Loại bỏ số trùng lặp và sắp xếp
    return [...new Set(pages)].sort((a, b) => (a === "..." ? 1 : a - b));
  };

  const paginationItems = getPaginationItems();

  return (
    <div className="flex items-center justify-between border-t border-gray-400 bg-white px-4 py-3">
      <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to <span className="font-medium">{Math.min(currentPage * pageSize, totalItems)}</span> of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
            aria-label="Pagination"
          >
            {/* Nút Previous */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center justify-center rounded-l-md px-2 py-2 text-gray-600 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <i className="ki-filled ki-arrow-right rotate-180"/>
            </button>

            {/* Số trang */}
            {paginationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => item !== "..." && onPageChange(item)}
                className={`relative transition-colors duration-200 inline-flex items-center px-4 py-2 text-md font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                  item === currentPage
                    ? "z-10 bg-indigo-600 text-white hover:bg-indigo-800 "
                    : "hover:bg-indigo-800 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}

            {/* Nút Next */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center justify-center rounded-r-md px-2 py-2 text-gray-600 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <i className="ki-filled ki-arrow-right "/>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
