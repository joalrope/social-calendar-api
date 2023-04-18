import { getSMPosts } from "./SMPosts/get-sm-posts";
import { createSMPost } from "./SMPosts/create-sm-post";
import { createUser } from "./Users/create-user";

export const paths = {
  paths: {
    "/api/smposts": {
      ...getSMPosts,
      ...createSMPost,
    },
    "/api/users": {
      ...createUser,
    },

    // '/todos/{id}':{
    //     ...getTodo,
    //     ...updateTodo,
    //     ...deleteTodo
    // }
  },
};
