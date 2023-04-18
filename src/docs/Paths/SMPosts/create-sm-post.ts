export const createSMPost = {
  post: {
    tags: ["SMPost"],
    parameters: [
      {
        in: "body",
        name: "api/smposts",
        description: "Create a new social media post.",
        schema: {
          type: "object",
          required: ["socialMedia", "message", "postDate", "user"],
          properties: {
            socialMedia: {
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
            socialMedia: "Facebook",
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
};
