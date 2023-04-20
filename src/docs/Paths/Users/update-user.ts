export const updateUser = {
  put: {
    tags: ["Users"],
    summary: "user data update",
    security: [
      {
        bearerAuth: [],
      },
    ],
    produce: ["application/json"],
    parameters: [
      {
        name: "id",
        in: "path",
        type: "string",
        format: "MongoDB Id",
        required: true,
      },
    ],
    responses: {
      "200": {
        description: "A user object.",
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
