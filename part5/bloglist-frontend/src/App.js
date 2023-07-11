import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    if (user === null) {
        return <LoginForm setUser={setUser} />;
    }
    return (
        <div>
            <h2>blogs</h2>
            <p>{user.username} logged in</p>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
