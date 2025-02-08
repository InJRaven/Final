import instance from "./axios";

export const getSettings = () => instance.get("/settings");
export const getMenu = () => instance.get("/menus");
export const getRelated = () => instance.get("/products-by-categories");

export const getProducts = (param) =>
  instance.get("/products", { params: param });

export const getProductsAvailable = (param) =>
  instance.get("/products-available", { params: param });
export const getSlugProduct = (slug) => instance.get(`/products/${slug}`);

export const getServices = () => instance.get("/services");

export const getCategoriesGallery = () => instance.get("/categories");
export const getGallery = (param) =>
  instance.get("/galleries", { params: param });

export const getPost = (url) => instance.get(`/menus/${url}`);
