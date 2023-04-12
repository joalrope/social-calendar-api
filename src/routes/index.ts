import { authRouter } from "./auth";
import { userRouter } from "./users";
import { uploadRouter } from "./uploads";
import { searchRouter } from "./search";
import { categoryRouter } from "./categories";
import { smPostRouter } from "./sm-posts";

export {
  authRouter,
  userRouter,
  uploadRouter,
  searchRouter,
  categoryRouter,
  smPostRouter as productRouter,
};
