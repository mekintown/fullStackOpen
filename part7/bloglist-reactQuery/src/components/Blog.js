import { useState } from "react";
import blogService from "../services/blogs";
import { useMutation, useQueryClient } from "react-query";
import { useNotify } from "../NotificationContext";

const Blog = ({ blog, user }) => {
	const [visible, setVisible] = useState(false);
	const queryClient = useQueryClient();
	const notifyWith = useNotify();

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

	const showWhenVisible = { display: visible ? "" : "none" };

	const likeMutation = useMutation(blogService.update, {
		onSuccess: ({ title }) => {
			queryClient.invalidateQueries("blogs");
			notifyWith(`blog ${title} voted`);
		},
	});

	const removeMutation = useMutation(blogService.remove, {
		onSuccess: (id) => {
			queryClient.invalidateQueries("blogs");
			notifyWith(`blog ${id} removed`);
		},
	});

	const toggleVisibility = () => setVisible(!visible);

	const handleLikeClick = () => {
		const newBlog = { ...blog, likes: blog.likes + 1 };
		likeMutation.mutate(newBlog);
	};

	const handleRemoveClick = () => {
		if (window.confirm(`Delete ${blog.title}?`)) {
			removeMutation.mutate(blog.id);
		}
	};

	return (
		<div style={blogStyle} className="blog">
			<h3>
				{blog.title} | {blog.author}
			</h3>
			<button onClick={toggleVisibility}>{visible ? "Hide" : "Show"}</button>
			<div style={showWhenVisible} className="togglableContent">
				<p>{blog.url}</p>
				<p>
					likes: {blog.likes} <button onClick={handleLikeClick}>like</button>
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
