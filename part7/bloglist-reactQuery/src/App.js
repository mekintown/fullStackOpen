import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useNotify } from "./NotificationContext";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const notifyWith = useNotify();

	useEffect(() => {
		blogService.getAll().then((blogs) => {
			blogs.sort((a, b) => b.likes - a.likes);
			setBlogs(blogs);
		});
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

		notifyWith(`a new blog ${returnedBlog.title} added`);
	};

	const blogFormRef = useRef();

	const blogsStyle = {
		display: "grid",
		gridTemplateColumns: "repeat(1, minmax(250px, 1fr) )",
		gap: "1rem",
	};

	if (user === null) {
		return (
			<>
				<Notification />
				<LoginForm setUser={setUser} />
			</>
		);
	}

	return (
		<div>
			<Notification />
			<Togglable buttonLabel="new blog" ref={blogFormRef}>
				<BlogForm createBlog={addBlog} />
			</Togglable>
			<h2>blogs</h2>
			<p>
				{user.username} logged in{" "}
				<button onClick={handleLogoutClick}>logout</button>
			</p>
			<div style={blogsStyle}>
				{blogs.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						user={user}
						blogs={blogs}
						setBlogs={setBlogs}
					/>
				))}
			</div>
		</div>
	);
};

export default App;
