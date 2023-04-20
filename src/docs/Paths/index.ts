import { getSMPosts } from "./SMPosts/get-sm-posts";
import { createSMPost } from "./SMPosts/create-sm-post";
import { createUser } from "./Users/create-user";
import { deleteUser } from "./Users/delete-user";
import { login } from "./Auth/login";
import { getUsers } from "./Users/get-users";
import { updateUser } from "./Users/update-user";

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
      ...getSMPosts,
      ...createSMPost,
    },

    // '/todos/{id}':{
    //     ...getTodo,
    //     ...updateTodo,
    //     ...deleteTodo
    // }
  },
};
