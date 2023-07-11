import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState("");

    const handleLogoutClick = () => {
        loginService.logout(setUser);
    };

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    if (user === null) {
        return (
            <>
                <Notification notification={notification} />
                <LoginForm
                    setUser={setUser}
                    setNotification={setNotification}
                />
            </>
        );
    }
    return (
        <div>
            <Notification notification={notification} />
            <BlogForm
                setBlogs={setBlogs}
                blogs={blogs}
                setNotification={setNotification}
            />
            <h2>blogs</h2>
            <p>
                {user.username} logged in{" "}
                <button onClick={handleLogoutClick}>logout</button>
            </p>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
