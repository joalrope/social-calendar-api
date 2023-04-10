import { getPosts } from "./get-posts";

export const paths = {
  paths: {
    "/smposts": {
      ...getPosts,
    },
    // '/todos/{id}':{
    //     ...getTodo,
    //     ...updateTodo,
    //     ...deleteTodo
    // }
  },
};
