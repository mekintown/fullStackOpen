import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user, blogs, setBlogs }) => {
    const [visible, setVisible] = useState(false);

    const showWhenVisible = { display: visible ? "" : "none" };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const handleLikeClick = async () => {
        const newBlog = { ...blog, likes: blog.likes + 1 };
        const returnedBlog = await blogService.update(newBlog);
        const newBlogs = blogs.map((oldBlog) => {
            return oldBlog.id !== returnedBlog.id ? oldBlog : returnedBlog;
        });
        newBlogs.sort((a, b) => b.likes - a.likes);
        setBlogs(newBlogs);
    };

    const blogStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        backgroundColor: "#f1f5f9",
        overflow: "scroll",
        padding: "0.5rem",
        borderRadius: "0.25rem",
        margin: "0rem, 1rem",
    };

    return (
        <div style={blogStyle}>
            <h3>
                {blog.title} | {blog.author}
            </h3>
            <button onClick={toggleVisibility}>
                {visible ? "Show" : "Hide"}
            </button>
            <div style={showWhenVisible}>
                <p>{blog.url}</p>
                <p>
                    likes: {blog.likes}{" "}
                    <button onClick={handleLikeClick}>like</button>
                </p>
                <h5>{user.name}</h5>
            </div>
        </div>
    );
};

export default Blog;
