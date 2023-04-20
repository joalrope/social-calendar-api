export const createUser = {
  post: {
    tags: ["Users"],
    summary: "Creates a new user.",
    consumes: ["application/json"],
    produce: ["application/json"],
    name: "user",
    in: "body",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["name", "email", "password"],
            properties: {
              id: {
                $ref: "#/components/schemas/id",
              },
              name: {
                type: "string",
                description: "The user's name",
              },
              email: {
                type: "string",
                description: "The user's email",
              },
              password: {
                type: "string",
                description: "The user's password",
              },
              picture: {
                type: "string",
                description: "The user's avatar",
              },
              role: {
                type: "string",
                description: "The user's role",
              },
            },
            example: {
              name: "Bohiques Contact",
              email: "contact@bohiques.com",
              password: "Bo.-hi2023",
              picture: "https://cloudinary.com/45lok999ugt55f4.png",
              role: "USER_ROLE",
            },
          },
        },
      },
    },
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
};
