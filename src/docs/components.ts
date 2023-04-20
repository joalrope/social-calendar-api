export const components = {
  components: {
    schemas: {
      // id model
      id: {
        type: "ObjectId of MongoDB",
        description: "An id of a resource",
        example: "507f1f77bcf86cd799439011", // example of an id
      },
      // Social Media Post model
      SMPost: {
        type: "object",
        properties: {
          id: {
            $ref: "#/components/schemas/id",
          },
          socialMedia: {
            type: "string",
            description: "Name of social media",
            example: "Facebook",
          },
          message: {
            type: "string",
            description: "Message to be published on the social network",
            example:
              "Visita a Bohiques.com y encontraras la manera mas rapida de fortalecer tu marca.",
          },
          visualResources: {
            type: "Array of string",
            description: "Array with the url's visual resources",
            example: `["https://cloudinary.com/user/kkj;5467ggf4", "https://youtube.com/user/yygvtr565"]`,
          },
          postdate: {
            type: "date",
            description: "Date and time of post on the social network",
            example: "2021-02-25T10:03:46.000Z", // example of a completed value
          },
          isPostMade: {
            type: "boolean",
            description:
              "Status of post. If the message already is Published is true",
            example: "true", // example of a completed value
          },
          user: {
            type: "string",
            description: "Owner of the post",
            example: "Bohiques.com",
          },
        },
      },
      User: {
        type: "object",
        properties: {
          id: {
            $ref: "#/components/schemas/id",
          },
          name: {
            type: "string",
            description: "User name",
            example: "Bohiques contact",
          },
          email: {
            type: "string",
            description: "User email",
            example: "contact@bohiques.com",
          },
          password: {
            type: "string",
            description: "user access password ",
            example: "bohi$.ques2023",
          },
          role: {
            type: "string",
            description: "role to assign to the user",
            example: "USER_ROLE",
          },
        },
      },
      Response: {
        type: "object",
        properties: {
          ok: {
            type: "boolean",
            description: "response status",
            example: "true",
          },
          msg: {
            type: "string",
            description: "response status",
            example: "request made successfully",
          },
          result: {
            type: "object",
            description: "object with requested values",
            example: "{ id: '44sfsfs4ssffs', name: 'Bohiquez Contact'}", // example of an error internal code
          },
        },
      },
      // error model
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Error message",
            example: "Not found", // example of an error message
          },
          internal_code: {
            type: "string",
            description: "Error internal code",
            example: "Invalid parameters", // example of an error internal code
          },
        },
      },
    },
    // JWT Authorization
    securitySchemes: {
      bearerAuth: {
        type: "http",
        in: "header",
        name: "x-token",
        description: "Bearer token to access these api endpoints",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
