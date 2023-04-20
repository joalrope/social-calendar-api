export const getUsers = {
  // method of operation
  get: {
    tags: ["Users"], // operation's tag.
    summary: "User list.",
    produce: ["application/json"],
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "User List were obtained", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Response", // response model
            },
          },
        },
      },
    },
  },
};
