const blogRouter = require("express").Router();
const Blog = require("../models/blog");
require("express-async-errors");

blogRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
    let newBlog = request.body;
    if (!request.body.likes) {
        newBlog = { ...request.body, likes: 0 };
    }
    const blog = new Blog(newBlog);
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

module.exports = blogRouter;
