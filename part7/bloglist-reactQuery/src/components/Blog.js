import { useState } from "react";
import blogService from "../services/blogs";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useNotify } from "../NotificationContext";
import { useUserValue } from "../UserContext";
import { useParams, useNavigate } from "react-router-dom";

const Blog = () => {
	const [visible, setVisible] = useState(false);
	const queryClient = useQueryClient();
	const notifyWith = useNotify();
	const user = useUserValue();
	const navigate = useNavigate();

	const {
		data: blogs,
		isLoading,
		isError,
		isFetching,
	} = useQuery("users", blogService.getAll);

	const id = useParams().id;

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
			navigate("/");
		}
	};

	if (isFetching) {
		return <div>Fetching</div>;
	}

	if (isLoading) return <div>loading data...</div>;

	if (isError)
		return <div>user service not available due to problems in server</div>;

	const blog = blogs.find((blog) => blog.id === id);
	return (
		<div className="blog">
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
