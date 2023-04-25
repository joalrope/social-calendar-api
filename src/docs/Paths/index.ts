import { login } from "./Auth/login";
import { userCR } from "./Users/user-CR";
import { userUD } from "./Users/userUD";
import { snPostCR } from "./SNPosts/sn-post-CR";
import { snPostUD } from "./SNPosts/sn-post-UD";

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
      ...snPostCR,
    },
    "/api/smposts/{id}": {
      ...snPostUD,
    },

    // '/todos/{id}':{
    //     ...getTodo,
    //     ...updateTodo,
    //     ...deleteTodo
    // }
  },
};
