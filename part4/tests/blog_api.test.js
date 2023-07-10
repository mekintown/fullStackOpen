const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

test("unique identifier property of the blog posts is named id", async () => {
    const blogs = await api.get("/api/blogs");
    expect(blogs.body[0].id).toBeDefined();
    expect(blogs.body[0]._id).toBeUndefined();
});
afterAll(async () => {
    await mongoose.connection.close();
});
