import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CV On The Move API',
            version: '1.0.0',
            description: 'API Documentation for the CV Builder Application',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: process.env.NODE_ENV === 'production'
        ? ['./dist/features/**/routes/*.js', './dist/app.js']
        : ['./src/features/**/routes/*.ts', './src/app.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
