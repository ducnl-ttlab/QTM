const express = require("express");
const cors = require("cors");
const app = express();
const { sequelize } = require("./db/models");
const redis = require("redis");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const allowlist = ["http://localhost:3000", "http://localhost:3001", "https://academix.netlify.app"];

const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        var corsOptions;
        if (allowlist.indexOf(origin) !== -1) {
            corsOptions = { origin: true };
        } else {
            corsOptions = { origin: false };
        }
        callback(null, corsOptions);
    },
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(
    express.urlencoded({
        extended: true,
    })
);
(async () => {
    const client = await redis.createClient({
        host: "redis-19335.c291.ap-southeast-2-1.ec2.cloud.redislabs.com",
        port: 19335,
        no_ready_check: true,
        auth_pass: "pwMzzgb4ULJoF4HueLz5jBVkEzT8CgCX",
    });

    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();

    global.redisClient = client;
    console.log("redis connected!");
})();
app.use("/api/auth", require("./routes/user/auth"));
app.use("/api/admin", require("./routes/user/admin"));
app.use("/api/user", require("./routes/user/user"));
app.use("/api/category", require("./routes/course/category"));
app.use("/api/course", require("./routes/course/course"));
app.use("/api/usercourse", require("./routes/usercourse/usercourse"));
app.use("/api/notification", require("./routes/notification/notification"));

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
