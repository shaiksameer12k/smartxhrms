import swaggerJsdoc from "swagger-jsdoc";

const tags = [
    {name: "Admin", description: "Admin API'S"},
    {name: "PreOnboarding", description: "Pre Onboarding API'S"},
];

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "SMART-X HRMS API",
            version: "1.0.0",
            description: "Smart-x HRMS REST API Documentation",
            contact: {
                name: "SMART-X Dev Team",
                email: "dev@smartx.com",
            },
        },
        servers: [
            {
                url: "http://localhost:4000",
                description: "Development server",
            },
        ],
        tags: tags,
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

    // ✅ cover all modules at once
    apis: [
        "./src/modules/**/*.route.js", // all route files
        "./src/modules/**/*.routes.js", // in case naming varies
    ],
};

export const swaggerSpec = swaggerJsdoc(options);
