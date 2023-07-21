import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useNotify } from "./NotificationContext";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useLogin, useLogout, useUserValue } from "./UserContext";

const App = () => {
	const notifyWith = useNotify();
	const blogFormRef = useRef();
	const queryClient = useQueryClient();
	const login = useLogin();
	const logout = useLogout();
	const user = useUserValue();

	const {
		data: blogs,
		isLoading,
		isError,
	} = useQuery("blogs", blogService.getAll);

	const blogMutation = useMutation(blogService.create, {
		onSuccess: () => {
			queryClient.invalidateQueries("blogs");
		},
	});

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			login(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleLogoutClick = () => {
		loginService.logout();
		logout();
	};

	const addBlog = (blogObject) => {
		blogFormRef.current.toggleVisibility();
		blogMutation.mutate(blogObject, {
			onSuccess: (newBlog) => {
				notifyWith(`a new blog ${newBlog.title} added`);
			},
		});
	};

	const byLikes = (b1, b2) => b2.likes - b1.likes;

	if (isLoading) return <div>loading data...</div>;

	if (isError)
		return <div>anecdote service not available due to problems in server</div>;

	return (
		<div>
			<Notification />
			{user === null ? (
				<LoginForm />
			) : (
				<>
					<Togglable buttonLabel="new blog" ref={blogFormRef}>
						<BlogForm createBlog={addBlog} />
					</Togglable>
					<h2>blogs</h2>
					<p>
						{user.username} logged in{" "}
						<button onClick={handleLogoutClick}>logout</button>
					</p>
					{blogs.sort(byLikes).map((blog) => (
						<Blog key={blog.id} blog={blog} user={user} />
					))}
				</>
			)}
		</div>
	);
};

export default App;
