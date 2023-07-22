import { useEffect, useRef } from "react";
import BlogForm from "./BlogForm";
import blogService from "../services/blogs";
import Togglable from "./Togglable";
import { useNotify } from "../NotificationContext";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useLogin } from "../UserContext";
import { Link } from "react-router-dom";

const Blogs = () => {
	const notifyWith = useNotify();
	const blogFormRef = useRef();
	const queryClient = useQueryClient();
	const login = useLogin();

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

	const addBlog = (blogObject) => {
		blogFormRef.current.toggleVisibility();
		blogMutation.mutate(blogObject, {
			onSuccess: (newBlog) => {
				notifyWith(`a new blog ${newBlog.title} added`);
			},
		});
	};

	const byLikes = (b1, b2) => b2.likes - b1.likes;

	const blogStyle = {
		display: "flex",
		flexDirection: "column",
		alignItems: "start",
		backgroundColor: "#ffffff",
		padding: "2rem",
		borderRadius: "0.25rem",
		boxShadow: "0 4px 6px 0 hsla(0, 0%, 0%, 0.2)",
		textDecoration: "none",
		color: "black",
		maxWidth: "800px",
		width: "100%",
		margin: "1rem auto",
	};

	const blogWrapperStyle = {
		display: "flex",
		flexDirection: "column",
		gap: "2rem",
	};

	if (isLoading) return <div>loading data...</div>;

	if (isError)
		return <div>anecdote service not available due to problems in server</div>;
	return (
		<div>
			<>
				<Togglable buttonLabel="new blog" ref={blogFormRef}>
					<BlogForm createBlog={addBlog} />
				</Togglable>
				<div style={blogWrapperStyle}>
					{blogs.sort(byLikes).map((blog) => (
						<Link key={blog.id} to={`/blogs/${blog.id}`} style={blogStyle}>
							{blog.title}
						</Link>
					))}
				</div>
			</>
		</div>
	);
};

export default Blogs;
