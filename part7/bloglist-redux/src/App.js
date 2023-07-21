import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { displayNotification } from "./reducers/notificationReducer";
import { initializeBlog, createBlog } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
	const [user, setUser] = useState(null);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initializeBlog());
	}, []);

	const blogs = useSelector((state) => state.blogs);

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
		dispatch(createBlog(blogObject));
		displayNotification(`a new blog ${blogObject.title} added`, 5000);
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

	const byLikes = (b1, b2) => b2.likes - b1.likes;
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
				{blogs
					.slice()
					.sort(byLikes)
					.map((blog) => (
						<Blog key={blog.id} blog={blog} user={user} blogs={blogs} />
					))}
			</div>
		</div>
	);
};

export default App;
