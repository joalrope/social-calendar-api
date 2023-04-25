import { Express } from "express";
import { categoryRouter } from "./categories";
import { uploadRouter } from "./uploads";
import { snPostRouter } from "./sn-posts";
import { searchRouter } from "./search";
import { userRouter } from "./users";
import { authRouter } from "./auth";
import { socialNetworkRouter } from "./social-network";

interface IPaths {
  categories: string;
  smPost: string;
  uploads: string;
  search: string;
  users: string;
  auth: string;
  sm: string;
}

const paths: IPaths = {
  categories: "/api/categories",
  uploads: "/api/uploads",
  smPost: "/api/smposts",
  search: "/api/search",
  users: "/api/users",
  auth: "/api/auth",
  sm: "/api/sm",
};

export const apiRoutes = (app: Express) => {
  app.use(paths.categories, categoryRouter);
  app.use(paths.uploads, uploadRouter);
  app.use(paths.smPost, snPostRouter);
  app.use(paths.search, searchRouter);
  app.use(paths.users, userRouter);
  app.use(paths.auth, authRouter);
  app.use(paths.sm, socialNetworkRouter);
};
