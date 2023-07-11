import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState("");

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

    const handleLogoutClick = () => {
        loginService.logout(setUser);
    };

    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility();
        const returnedBlog = await blogService.create(blogObject);
        setBlogs(blogs.concat(returnedBlog));

        setNotification(`a new blog ${returnedBlog.title} added`);
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    };

    const blogFormRef = useRef();

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
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
            </Togglable>
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
