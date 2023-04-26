import { login } from "./Auth/login";
import { userCR } from "./Users/user-CR";
import { userUD } from "./Users/userUD";
import { snPostCR } from "./SNPosts/sn-post-CR";
import { snPostUD } from "./SNPosts/sn-post-UD";
import { socialNetworkCR } from "./Social-Network/socialNetwork-CR";
import { socialNetworkUD } from "./Social-Network/socialNetwork-UD";
import { socialNetworkR } from "./Social-Network/socialNetwork-R";

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
    "/api/social-network": {
      ...socialNetworkCR,
    },
    "/api/social-network/{id}/{userId}": {
      ...socialNetworkR,
    },
    "/api/social-network/{id}": {
      ...socialNetworkUD,
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
