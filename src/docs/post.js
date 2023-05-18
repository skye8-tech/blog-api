const { serverResponses, bearerAuth } = require("./response.js");

const postResponse = {
  title: "John",
  body: "Snow",
  attachment: "john.snow@attachment.com",
};

const postResponseWp = {
  title: { example: "The patriot" },
  body: { example: "Some descriot" },
  attachment: { example: "https://www.jsonplaceholder.com/images/ur39oeto.jpg" },
};

const createPost = {
  tags: ["Post"],
  description: "Create a new post in the system",
  operationId: "createPost",
  security: [],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/createPostBody",
        },
      },
    },
    required: true,
  },
  responses: {
    201: {
      description: "post created successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: postResponseWp,
          },
        },
      },
    },
    500: serverResponses[500],
    409: serverResponses[409],
  },
};


const deletePost = {
  tags: ["Post"],
  description: "Delete a post",
  operationId: "deletePost",
  security: [
    {
      bearerAuth,
    },
  ],
  parameters: [
    {
      name: "",
      in: "path",
      description: "post ID",
      required: true,
      type: "string",
    },
  ],
  responses: {
    204: serverResponses[204],
    500: serverResponses[500],
    401: serverResponses[401],
    409: serverResponses[409],
  },
};


const getAllPosts = {
  tags: ["Post"],
  description: "Get all posts in the system",
  operationId: "getAllPosts",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: "Posts returned successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: {
                type: "array",
                example: [postResponse, postResponse],
              },
            },
          },
        },
      },
    },
    401: serverResponses[401],
    404: serverResponses[404],
    500: serverResponses[500],
  },
};

const getSinglePost = {
  tags: ["Post"],
  description: "Get a post",
  operationId: "getSinglePost",
  parameters: [
    {
      name: "",
      in: "path",
      description: "post's ID",
      required: true,
      type: "int",
    },
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: "posts returned successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: postResponseWp,
          },
        },
      },
    },
    401: serverResponses[401],
    404: serverResponses[404],
    500: serverResponses[500],
  },
};

const updateSinglePost = {
  tags: ["Post"],
  description: "Update a post in the system",
  operationId: "updateSinglePost",
  parameters: [
    {
      name: "",
      in: "path",
      description: "post's ID",
      required: true,
      type: "int",
    },
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/createPostBody",
        },
      },
    },
    required: true,
  },
  responses: {
    201: {
      description: "post!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: postResponse,
          },
        },
      },
    },
    401: serverResponses[401],
    404: serverResponses[404],
    500: serverResponses[500],
  },
};

const createPostBody = {
  type: "object",
  properties: {
    title: {
      type: "string",
      example: "John",
    },
    body: {
      type: "string",
      example: "Snow",
    },
    attachment: {
      type: "string",
      example: "john.snow@attachment.com",
    },
    author: {
      type: "string",
      description: "Author of the post",
      example: "_ea2344ygfvdft943io!",
    },
  },
};


const postPaths = {
  "/posts/create": {
    post: createPost,
  },
  "/posts/": {
    get: getAllPosts,
  },
  "/posts/{post_id}": {
    get: getSinglePost,
    patch: updateSinglePost,
    delete: deletePost,
  },

};

const postSchema = {
  createPostBody,
};

module.exports =  { postPaths, postSchema };