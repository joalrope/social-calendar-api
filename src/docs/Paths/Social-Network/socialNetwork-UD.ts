export const socialNetworkUD = {
  get: {
    tags: ["Social Network"],
    summary: "Get a social Network by id",
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
        description: "A Social Network object.",
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
    tags: ["Social Network"],
    summary: "Social Network data update",
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
    name: "social_network_post",
    in: "body",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["name"],
            properties: {
              id: {
                $ref: "#/components/schemas/id",
              },
              name: {
                type: "string",
                description: "The Social Network's name",
              },
            },
            example: {
              name: "Facebook",
            },
          },
        },
      },
    },
    responses: {
      "200": {
        description: "A Social Network object.",
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
    tags: ["Social Network"],
    summary: "Soft delete a social network.",
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
        description: "A social network object.",
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
