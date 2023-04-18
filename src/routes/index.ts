import { Express } from "express";
import { authRouter } from "./auth";
import { userRouter } from "./users";
import { uploadRouter } from "./uploads";
import { searchRouter } from "./search";
import { categoryRouter } from "./categories";
import { smPostRouter } from "./sm-posts";

interface IPaths {
  categories: string;
  smPost: string;
  uploads: string;
  search: string;
  users: string;
  auth: string;
}

const paths: IPaths = {
  categories: "/api/categories",
  uploads: "/api/uploads",
  smPost: "/api/smposts",
  search: "/api/search",
  users: "/api/users",
  auth: "/api/auth",
};

export const apiRoutes = (app: Express) => {
  app.use(paths.categories, categoryRouter);
  app.use(paths.uploads, uploadRouter);
  app.use(paths.smPost, smPostRouter);
  app.use(paths.search, searchRouter);
  app.use(paths.users, userRouter);
  app.use(paths.auth, authRouter);
};
