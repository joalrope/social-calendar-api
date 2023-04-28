import { Express } from "express";
import { socialNetworkRouter } from "./social-network";
import { uploadRouter } from "./uploads";
import { snPostRouter } from "./sn-posts";
import { searchRouter } from "./search";
import { userRouter } from "./users";
import { roleRouter } from "./roles";
import { authRouter } from "./auth";

interface IPaths {
  socialNetwork: string;
  smPost: string;
  uploads: string;
  search: string;
  users: string;
  roles: string;
  auth: string;
}

const paths: IPaths = {
  socialNetwork: "/api/social-network",
  uploads: "/api/uploads",
  smPost: "/api/smposts",
  search: "/api/search",
  users: "/api/users",
  roles: "/api/roles",
  auth: "/api/auth",
};

export const apiRoutes = (app: Express) => {
  app.use(paths.socialNetwork, socialNetworkRouter);
  app.use(paths.uploads, uploadRouter);
  app.use(paths.smPost, snPostRouter);
  app.use(paths.search, searchRouter);
  app.use(paths.users, userRouter);
  app.use(paths.roles, roleRouter);
  app.use(paths.auth, authRouter);
};
