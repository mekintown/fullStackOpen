import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
	const [visible, setVisible] = useState(false);

	const showWhenVisible = { display: visible ? "" : "none" };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const dispatch = useDispatch();

	const handleLikeClick = async () => {
		dispatch(likeBlog(blog));
	};

	const handleRemoveClick = async (event) => {
		if (
			window.confirm(
				`Delete ${event.target.parentNode.parentNode.firstElementChild.textContent}?`
			)
		) {
			dispatch(removeBlog(blog.id));
		}
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

	const user = useSelector((state) => state.user);

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
