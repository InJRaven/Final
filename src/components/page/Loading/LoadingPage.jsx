import { ImSpinner10 } from "react-icons/im";
import { useLoading } from "../../../context/LoadingContext";
const LoadingPage = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null
  return (
    <div
      className="fixed z-50 top-0 left-0 min-h-screen w-full bg-white flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center h-full">
        <ImSpinner10 className="w-16 h-16 text-gray-900 animate-spin mb-4" />
        {/* <p className="text-gray-600 text-lg font-semibold">Loading...</p> */}
      </div>
    </div>
  );
};

export default LoadingPage;
