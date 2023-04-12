export const getPosts = {
  // method of operation
  get: {
    tags: ["SMPost CRUD operations"], // operation's tag.
    description: "Get posts", // operation's desc.
    operationId: "getPosts", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "SMPosts were obtained", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/SMPost", // Post model
            },
          },
        },
      },
    },
  },
};
