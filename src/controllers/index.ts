import { login } from "./auth";
import { getUsers, createUser, updateUser, deleteUser } from "./users";
import {
  getSMPosts,
  getSMPost,
  createSMPost,
  updateSMPost,
  deleteSMPost,
} from "./sm-posts";
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
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getSMPosts,
  getSMPost,
  createSMPost,
  updateSMPost,
  deleteSMPost,
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
