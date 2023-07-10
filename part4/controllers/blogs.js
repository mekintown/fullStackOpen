const blogRouter = require("express").Router();
const Blog = require("../models/blog");

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

module.exports = blogRouter;
