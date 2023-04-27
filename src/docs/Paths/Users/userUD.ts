export const userUD = {
  get: {
    tags: ["Users"],
    summary: "Get a user data by id",
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
  delete: {
    tags: ["Users"],
    summary: "Soft delete a user.",
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
