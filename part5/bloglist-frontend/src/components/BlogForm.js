import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ blogs, setBlogs }) => {
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
        const returnedBlog = await blogService.create(blogObject);
        setBlogs(blogs.concat(returnedBlog));
        setNewTitle("");
        setNewAuthor("");
        setNewUrl("");
    };

    return (
        <>
            <h2>create new</h2>
            <form>
                <label htmlFor="newTitle">Title</label>
                <input
                    id="newTitle"
                    value={newTitle}
                    onChange={handleNewTitleChange}
                />

                <label htmlFor="newAuthor">Author</label>
                <input
                    id="newAuthor"
                    value={newAuthor}
                    onChange={handleNewAuthorChange}
                />

                <label htmlFor="newUrl">Url</label>
                <input
                    id="newUrl"
                    value={newUrl}
                    onChange={handleNewUrlChange}
                />

                <button type="submit" onClick={addBlog}>
                    create
                </button>
            </form>
        </>
    );
};

export default BlogForm;
