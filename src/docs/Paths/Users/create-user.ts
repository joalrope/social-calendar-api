export const createUser = {
  post: {
    tags: ["Users"],
    parameters: [
      {
        in: "body",
        name: "api/users",
        description: "Create a new user.",
        schema: {
          type: "object",
          required: ["name", "email", "password", "picture", "role"],
          properties: {
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
            password: {
              type: "string",
            },
            picture: {
              type: "string",
            },
            role: {
              type: "string",
            },
          },
          example: {
            name: "Bohiques Contact",
            email: "contact@bohiques.com",
            password: "bo.-hi2023",
            picture: "https://cloudinary.com/45lok999ugt55f4.png",
            role: "USER_ROLE",
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
