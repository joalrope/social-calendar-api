export const socialNetworkCR = {
  post: {
    tags: ["Social Network"],
    summary: "Creates a new Social Network.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    consumes: ["application/json"],
    produce: ["application/json"],
    name: "social_network",
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
      "409": {
        description: "The request can't be processed.",
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
  get: {
    tags: ["Social Network"],
    summary: "Social Network list.",
    produce: ["application/json"],
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Social network List were obtained", // response desc.
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
