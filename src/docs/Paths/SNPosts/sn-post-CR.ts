export const snPostCR = {
  post: {
    tags: ["Social Network Post"],
    summary: "Add new information to be published on a social network.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    consumes: ["application/json"],
    produce: ["application/json"],
    name: "snPost",
    in: "body",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["socialNetwork", "message", "postDate", "user"],
            properties: {
              id: {
                $ref: "#/components/schemas/id",
              },
              socialNetwork: {
                type: "string",
                description: "the name of the social network",
              },
              message: {
                type: "string",
                description: "the message of the post",
              },
              visualResources: {
                type: "[string]",
                description:
                  "the different visual resources (images, videos, etc) of the publication",
              },
              postDate: {
                type: "string",
                format: "datetime",
                description: "the date on which the publication will be made",
              },
              user: {
                type: "string",
                description: "user account where the publication will be made",
              },
            },
            example: {
              socialNetwork: "644b0665d078621d04319da7",
              message:
                "Visita a Bohiques.com y encontraras la manera mas rapida de fortalecer tu marca.",
              visualResources: [
                "https://youtube.com/user/yygvtr565.png",
                "https://cloudinary.com/user/kkj;5467ggf4.jpeg",
              ],
              postDate: "2023-05-25T10:03:46.000Z",
            },
          },
        },
      },
    },
    responses: {
      "200": {
        description: "A social network post object.",
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
    tags: ["Social Network Post"], // operation's tag.
    summary: "Social network Post list.",
    produce: ["application/json"],
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
