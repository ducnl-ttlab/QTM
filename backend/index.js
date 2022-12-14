const express = require("express");
const cors = require("cors");
const app = express();
const { sequelize } = require("./db/models");
const redis = require("redis");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const allowlist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://academix.netlify.app",
  "http://35.240.138.169:3000",
  "http://35.240.138.169:5000",
  "http://35.240.138.169",
];

const redisUrl = `${process.env.REDIS_URL || "redis://127.0.0.1:6379"}`;

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
