import { login, validateUserToken } from "./auth";
import { getUsers, createUser, updateUser, deleteUser } from "./users";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./products";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./categories";
import { searchUser, searchCategories, searchProducts } from "./search";
import {
  fileUpload,
  updateImage,
  updateImageCloudinary,
  showImage,
} from "./uploads";

export {
  login,
  validateUserToken,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  searchUser,
  searchCategories,
  searchProducts,
  fileUpload,
  updateImage,
  updateImageCloudinary,
  showImage,
};
