const express = require("express");
const cors = require("cors");
const app = express();
const { sequelize } = require("./db/models");
const { createClient } = require("redis");
const _ = require("lodash");
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Elearning",
            version: "1.0.0",
            description: "Help you build your personal brand",
        },
        servers: [
            {
                url: "http://localhost:7500",
            },
        ],
    },
    apis: ["./routes/**/*.js"],
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

require("dotenv").config();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200,
    credentials: true,
};

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

(async () => {
    const client = await createClient({
        url: process.env.REDIS_URL,
    });

    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();

    global.redisClient = client;
    global._ = _;
    console.log("redis connected!");
})();
app.use("/", require("./routes"));

app.use((req, res) => {
    res.status(404).json({
        msg: "Page not found",
    });
});

app.listen(PORT, async () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
    await sequelize.authenticate();
    console.log("database connected!");
});
