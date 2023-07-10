const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const app = express();

mongoose
    .connect(config.MONGODB_URL)
    .then(() => {
        logger.info("connected to", config.MONGODB_URL);
    })
    .catch((error) => {
        logger.error("error connecting to MangoDB:", error.message);
    });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
