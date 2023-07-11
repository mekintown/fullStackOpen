import { useState } from "react";

const BlogForm = () => {
    const [newBlog, setNewBlog] = useState("");

    const handleBlogChange = ({ target }) => {
        setNewBlog(target.value);
    };
    return (
        <>
            <h2>log in to application </h2>
            <form>
                <input value={newBlog} onChange={handleBlogChange} />
                <button type="submit">save</button>
            </form>
        </>
    );
};

export default BlogForm;
