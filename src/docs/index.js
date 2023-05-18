const { postSchema, postPaths } = require("./post");
const { userPaths, userSchema } = require("./user");
const apiV1 = {
  openapi: "3.0.1",
  info: {
    version: "1.3.0",
    title: "Social base - Documentation",
    description: "Social base Documentation: v1",
    termsOfService: "https://www.termsofservice.com/",
    contact: {
      name: "Spyke Lionel",
      email: "spykelionel@gmail.com",
      url: "https://twitter.com/spykelionel",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  servers: [
    {
      url: "http://localhost:3000/v1/",
      description: "Dev Server",
    },
  ],
  tags: [
    {
      name: "User",
    },
  ],
  paths: {
    ...userPaths,
    ...postPaths,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      ...userSchema,
      ...postSchema,
    },
    responses: {
      UnauthorizedError: {
        description: "Access token is missing or invalid!",
      },
      NotFound: {
        description: "Resource not found!",
      },
      NoContent: {
        description: "The operation has successfully completed!",
      },
      ServerError: {
        description: "An internal server error occured.",
      },
    },
  },
};

module.exports = apiV1;