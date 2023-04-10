export const components = {
  components: {
    schemas: {
      // id model
      id: {
        type: "ObjectId of MongoDB",
        description: "An id of a post",
        example: "507f1f77bcf86cd799439011", // example of an id
      },
      // Social Media Post model
      SMPost: {
        type: "object",
        properties: {
          id: {
            type: "ObjectId of MongoDB",
            description: "An id of a post",
            example: "507f1f77bcf86cd799439011", // example of an id
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
          date: {
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
  },
};
