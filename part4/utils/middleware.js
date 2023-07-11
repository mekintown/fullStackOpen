const logger = require("./logger");
const Blog = require("../models/blog");

const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method);
    logger.info("Path:  ", request.path);
    logger.info("Body:  ", request.body);
    logger.info("---");
    next();
};

const tokenExtractor = (request, response, next) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        request.token = authorization.replace("Bearer ", "");
    }

    next();
};

const userExtractor = async (request, response, next) => {
    const blog = await Blog.findById(request.params.id);
    console.log(request.params.id);
    console.log(request.params);
    request.user = blog.user.toString();

    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }
    if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }
    if (error.name === "JsonWebTokenError") {
        return response.status(400).json({ error: error.message });
    }
    next(error);
};

module.exports = {
    requestLogger,
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler,
};
