const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");
require("express-async-errors");

blogRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
    });
    response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
    let newBlog = request.body;

    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" });
    }
    if (!request.body.likes) {
        newBlog = { ...request.body, likes: 0 };
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({ ...newBlog, user: user.id });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    const savedBlogPopulated = await Blog.findById(savedBlog._id).populate(
        "user",
        {
            username: 1,
            name: 1,
        }
    );
    response.status(201).json(savedBlogPopulated);
});

blogRouter.delete("/:id", userExtractor, async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" });
    }

    if (request.user !== decodedToken.id) {
        return response.status(401).json({ error: "invalid user" });
    }
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
    const { title, author, url, likes } = request.body;

    const blog = {
        title,
        author,
        url,
        likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
        runValidators: true,
        context: "query",
    });
    response.json(updatedBlog);
});

module.exports = blogRouter;
