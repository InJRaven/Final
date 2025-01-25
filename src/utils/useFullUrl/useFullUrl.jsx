import { useLocation } from "react-router-dom";

export const useFullUrl = () => {
  const location = useLocation();
  return `${window.location.origin}${location.pathname}${location.search}${location.hash}`;
};
