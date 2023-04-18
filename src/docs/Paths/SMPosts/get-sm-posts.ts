export const getSMPosts = {
  // method of operation
  get: {
    tags: ["SMPost"], // operation's tag.
    description: "Get sm-posts", // operation's desc.
    operationId: "getSMPosts", // unique operation id.
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
