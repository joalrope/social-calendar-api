import { getPosts } from "./get-sm-posts";

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
