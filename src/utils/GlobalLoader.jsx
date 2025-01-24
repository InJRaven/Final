import { useIsFetching } from "@tanstack/react-query";
import { ImSpinner10 } from "react-icons/im";
import { useState, useEffect } from "react";

const GlobalLoader = () => {
  const isFetching = useIsFetching();
  const [visible, setVisible] = useState(false);

  // Quản lý hiệu ứng fade-in-out
  useEffect(() => {
    if (isFetching > 0) {
      setVisible(true); // Bật loader khi có request
    } else {
      const timer = setTimeout(() => setVisible(false), 300); // Tắt loader sau khi request hoàn tất (300ms delay cho fade-out)
      return () => clearTimeout(timer); // Cleanup khi component unmount
    }
  }, [isFetching]);

  // Không hiển thị loader khi `visible` là false
  if (!visible) return null;

  return (
    <div
    className={`z-50 items-center justify-center fixed top-0 left-0 w-full h-full bg-white/80 backdrop-blur-sm transition-all duration-500 ${
      isFetching > 0 ? "opacity-100" : "opacity-0"
    }`}
    >
      <div className="flex flex-col items-center">
        <ImSpinner10 className="w-16 h-16 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
