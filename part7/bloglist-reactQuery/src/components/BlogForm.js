import { useState } from "react";

const BlogForm = ({ createBlog }) => {
	const [newTitle, setNewTitle] = useState("");
	const [newAuthor, setNewAuthor] = useState("");
	const [newUrl, setNewUrl] = useState("");

	const handleNewTitleChange = ({ target }) => {
		setNewTitle(target.value);
	};

	const handleNewAuthorChange = ({ target }) => {
		setNewAuthor(target.value);
	};

	const handleNewUrlChange = ({ target }) => {
		setNewUrl(target.value);
	};

	const addBlog = async (event) => {
		event.preventDefault();
		const blogObject = {
			title: newTitle,
			author: newAuthor,
			url: newUrl,
		};
		createBlog(blogObject);

		setNewTitle("");
		setNewAuthor("");
		setNewUrl("");
	};

	const formStyle = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100vw",
	};

	const buttonStyle = {
		backgroundColor: "#0277bd",
		color: "#ffffff",
		padding: "0.5em 1em",
		borderRadius: "4px",
		border: "none",
		cursor: "pointer",
		marginTop: "1em",
	};

	return (
		<>
			<h2>Create new</h2>
			<form style={formStyle}>
				<label htmlFor="newTitle">Title</label>
				<input id="newTitle" value={newTitle} onChange={handleNewTitleChange} />

				<label htmlFor="newAuthor">Author</label>
				<input
					id="newAuthor"
					value={newAuthor}
					onChange={handleNewAuthorChange}
				/>

				<label htmlFor="newUrl">Url</label>
				<input id="newUrl" value={newUrl} onChange={handleNewUrlChange} />

				<button type="submit" onClick={addBlog} style={buttonStyle}>
					Create
				</button>
			</form>
		</>
	);
};

export default BlogForm;
