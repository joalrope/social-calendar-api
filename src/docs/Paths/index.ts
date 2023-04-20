import { smPostCR } from "./SMPosts/sm-post-CR";
import { createUser } from "./Users/create-user";
import { deleteUser } from "./Users/delete-user";
import { login } from "./Auth/login";
import { getUsers } from "./Users/get-users";
import { updateUser } from "./Users/update-user";
import { smPostUD } from "./SMPosts/sm-post-UD";

export const paths = {
  paths: {
    "/api/auth/login": {
      ...login,
    },
    "/api/users": {
      ...createUser,
      ...getUsers,
    },
    "/api/users/{id}": {
      ...updateUser,
      ...deleteUser,
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
