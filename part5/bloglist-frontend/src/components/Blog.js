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
        await blogService.update(newBlog);
        // const newBlogs = blogs.map((oldBlog) => {
        //     return oldBlog.id !== returnedBlog.id ? oldBlog : returnedBlog;
        // });
        const newBlogs = await blogService.getAll();
        newBlogs.sort((a, b) => b.likes - a.likes);
        setBlogs(newBlogs);
    };

    const handleRemoveClick = async (event) => {
        if (
            window.confirm(
                `Delete ${event.target.parentNode.parentNode.firstElementChild.textContent}?`
            )
        ) {
            await blogService.remove(blog.id);
            const newBlogs = blogs.filter((oldBlog) => {
                return oldBlog.id !== blog.id;
            });
            setBlogs(newBlogs);
        }
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
                {visible ? "Hide" : "Show"}
            </button>
            <div style={showWhenVisible} className="togglableContent">
                <p>{blog.url}</p>
                <p>
                    likes: {blog.likes}{" "}
                    <button onClick={handleLikeClick}>like</button>
                </p>
                <h5>{blog.user.name}</h5>
                {blog.user.username === user.username && (
                    <button onClick={handleRemoveClick}>remove</button>
                )}
            </div>
        </div>
    );
};

export default Blog;
