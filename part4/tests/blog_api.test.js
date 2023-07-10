const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const { beforeEach } = require("node:test");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");

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

test("making an HTTP POST request to the /api/blogs URL successfully creates a new blog post", async () => {
    const blogObject = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    };
    await api
        .post("/api/blogs")
        .send(blogObject)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain("Canonical string reduction");
});

test(" if the likes property is missing from the request, it will default to the value 0", async () => {
    const blogObjectWithMissingLikes = {
        title: "Canonical At string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    };

    const response = await api
        .post("/api/blogs")
        .send(blogObjectWithMissingLikes)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    const createdBlog = response.body;

    expect(createdBlog.likes).toBe(0);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

test("if the title or author properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.", async () => {
    const blogObjectWithMissingTitle = {
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    };

    await api.post("/api/blogs").send(blogObjectWithMissingTitle).expect(400);

    const blogObjectWithMissingAuthor = {
        title: "Canonical At string reduction",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    };

    await api.post("/api/blogs").send(blogObjectWithMissingAuthor).expect(400);
}, 10000);

test("delete blog", async () => {
    const initialBlogs = await helper.blogsInDb();
    const blogToDelete = initialBlogs[0]; // Assuming there is at least one blog post

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);
    expect(blogsAtEnd).not.toContainEqual(blogToDelete);
});

test("update the number of likes for a blog post", async () => {
    const initialBlogs = await helper.blogsInDb();
    const blogToUpdate = initialBlogs[0]; // Assuming there is at least one blog post

    const updatedBlog = { ...blogToUpdate, likes: 10 }; // New likes value for the blog post

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlogInDb = blogsAtEnd.find(
        (blog) => blog.id === blogToUpdate.id
    );

    expect(updatedBlogInDb.likes).toBe(updatedBlog.likes);
});

describe("when there is initially one user in db", () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash("sekret", 10);
        const user = new User({ username: "root", passwordHash });

        await user.save();
    });

    test("creation succeeds with a fresh username", async () => {
        const userAtStart = await helper.usersInDb();

        const newUser = {
            username: "mluukkai",
            name: "Matti Luukkainen",
            password: "salainen",
        };

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const userAtEnd = await helper.usersInDb();
        expect(userAtEnd).toHaveLength(userAtStart.length + 1);

        const usernames = userAtEnd.map((user) => user.username);
        expect(usernames).toContain(newUser.username);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
