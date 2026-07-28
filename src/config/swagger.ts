import swaggerJsdoc from "swagger-jsdoc";


const options: swaggerJsdoc.Options = {

  definition: {

    openapi: "3.0.0",

    info: {
      title: "Beyond Media API",
      version: "1.0.0",
      description: "API documentation for Beyond Media CMS",
    },


    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local server",
      },
      {
        url: "https://api.dinnusmart.com/api",
        description: "Production server",
      },
    ],


    components: {

      securitySchemes: {

        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },

      },

    },

  },


  apis: [
    "./src/routes/*.routes.ts",
    "./src/controllers/*.ts",
  "./src/module/**/*.routes.ts",
  
  
],

};


export const swaggerSpec = swaggerJsdoc(options);