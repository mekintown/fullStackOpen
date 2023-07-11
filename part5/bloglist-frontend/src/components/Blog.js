import { useState } from "react";

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false);

    const showWhenVisible = { display: visible ? "" : "none" };

    const toggleVisibility = () => {
        setVisible(!visible);
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
            <h3>{blog.title} </h3>
            <button onClick={toggleVisibility}>
                {visible ? "Show" : "Hide"}
            </button>
            <div style={showWhenVisible}>
                <p>{blog.url}</p>
                <p>{blog.likes}</p>
                <h4>{blog.author}</h4>
            </div>
        </div>
    );
};

export default Blog;
