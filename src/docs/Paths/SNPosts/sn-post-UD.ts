export const snPostUD = {
  get: {
    tags: ["Social Network Post"],
    summary: "Get a social network post by id",
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
        description: "A Social Network Post object.",
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
    tags: ["Social Network Post"],
    summary: "Social network Post data update.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        type: "string",
        format: "MongoDB Id",
        required: true,
      },
      {
        in: "body",
        name: "snposts",
        description: "Update a new social network post.",
        schema: {
          type: "object",
          required: ["socialNetwork", "message", "postDate"],
          properties: {
            id: {
              $ref: "#/components/schemas/id",
            },
            socialNetwork: {
              type: "string",
            },
            message: {
              type: "string",
            },
            visualResources: {
              type: ["string"],
            },
            postDate: {
              type: "date",
            },
          },
          example: {
            socialNetwork: "644b0665d078621d04319da7",
            message:
              "Visita a Bohiques.com y encontraras la manera mas rapida de fortalecer tu marca. Y veras tus ingresos aumentar",
            visualResources:
              "['https://cloudinary.com/user/kkj;5467ggf4.jpeg']",
            postDate: "2023-05-25T10:03:40.000Z",
          },
        },
      },
    ],
    responses: {
      "200": {
        description: "OK",
      },
    },
  },
  delete: {
    tags: ["Social Network Post"], // operation's tag.
    summary: "Soft delete a social network post.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    description: "Get sn-posts", // operation's desc.
    operationId: "getSNPosts", // unique operation id.
    parameters: [
      {
        name: "id",
        in: "path",
        type: "string",
        format: "MongoDB Id",
        required: true,
      },
    ], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "SNPosts were obtained", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/SNPost", // Post model
            },
          },
        },
      },
    },
  },
};
