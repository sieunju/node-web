const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "node server api",
            description: "node server api입니다.",
        },
        servers: [
            {
                url: "https://node.qtzz.synology.me",
                url: "http://127.0.0.1:50048",
            }
        ],
    },
    apis: ["./server/features/**/*.js"],
}
const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }