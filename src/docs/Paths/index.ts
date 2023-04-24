import { login } from "./Auth/login";
import { userCR } from "./Users/user-CR";
import { userUD } from "./Users/userUD";
import { smPostCR } from "./SMPosts/sm-post-CR";
import { smPostUD } from "./SMPosts/sm-post-UD";

export const paths = {
  paths: {
    "/api/auth/login": {
      ...login,
    },
    "/api/users": {
      ...userCR,
    },
    "/api/users/{id}": {
      ...userUD,
    },
    "/api/smposts": {
      ...smPostCR,
    },
    "/api/smposts/{id}": {
      ...smPostUD,
    },

    // '/todos/{id}':{
    //     ...getTodo,
    //     ...updateTodo,
    //     ...deleteTodo
    // }
  },
};
