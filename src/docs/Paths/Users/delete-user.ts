export const deleteUser = {
  delete: {
    tags: ["Users"],
    summary: "Soft delete a user.",
    security: {
      bearerAuth: [],
    },
    produce: ["application/json"],
    parameters: [
      {
        name: "id",
        in: "query",
        type: "string",
        format: "MongoDB Id",
        required: true,
      },
    ],
    responses: {
      "200": {
        description: "A user object.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                ok: {
                  type: "boolean",
                },
                msg: {
                  type: "string",
                },
                result: {
                  type: "object",
                },
              },
            },
          },
        },
      },
    },
  },
};
