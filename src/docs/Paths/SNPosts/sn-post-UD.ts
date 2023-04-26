export const snPostUD = {
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
        in: "body",
        name: "snposts",
        description: "Create a new social network post.",
        schema: {
          type: "object",
          required: ["socialNetwork", "message", "postDate", "user"],
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
            user: {
              type: "ObjectId",
            },
          },
          example: {
            socialNetwork: "Facebook",
            message:
              "Visita a Bohiques.com y encontraras la manera mas rapida de fortalecer tu marca.",
            visualResources:
              "['https://cloudinary.com/user/kkj;5467ggf4.jpeg', 'https://youtube.com/user/yygvtr565.png']",
            postDate: "2021-02-25T10:03:46.000Z",
            user: "507f1f77bcf86cd799439011",
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
    parameters: [], // expected params.
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
