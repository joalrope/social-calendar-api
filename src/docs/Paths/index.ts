import { getSMPosts } from "./SMPosts/get-sm-posts";
import { createSMPost } from "./SMPosts/create-sm-post";
import { createUser } from "./Users/create-user";
import { deleteUser } from "./Users/delete-user";

export const paths = {
  paths: {
    "/api/smposts": {
      ...getSMPosts,
      ...createSMPost,
    },
    "/api/users": {
      ...createUser,
    },
    "/api/users/{id}": {
      ...deleteUser,
    },

    // '/todos/{id}':{
    //     ...getTodo,
    //     ...updateTodo,
    //     ...deleteTodo
    // }
  },
};
