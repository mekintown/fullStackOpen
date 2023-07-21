import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
	name: "blog",
	initialState: [],
	reducers: {
		appendBlog(state, action) {
			const newBlog = action.payload;
			return [...state, newBlog];
		},
		setBlog(state, action) {
			console.log(action);
			return action.payload;
		},
		replaceBlog(state, action) {
			const blogToReplace = action.payload;
			return state.map((blog) =>
				blog.id !== blogToReplace.id ? blog : blogToReplace
			);
		},
		deleteBlog(state, action) {
			const blogId = action.payload;
			return state.filter((blog) => blog.id !== blogId);
		},
	},
});

export const initializeBlog = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		dispatch(setBlog(blogs));
	};
};

export const createBlog = (newBlog) => {
	return async (dispatch) => {
		const returnedBlog = await blogService.create(newBlog);
		dispatch(appendBlog(returnedBlog));
	};
};

export const likeBlog = (blog) => {
	return async (dispatch) => {
		const changedBlog = await blogService.update({
			...blog,
			likes: blog.likes + 1,
		});
		dispatch(replaceBlog(changedBlog));
	};
};

export const removeBlog = (id) => {
	return async (dispatch) => {
		await blogService.remove(id);
		dispatch(deleteBlog(id));
	};
};

export const { appendBlog, setBlog, replaceBlog, deleteBlog } =
	blogSlice.actions;

const blogReducer = blogSlice.reducer;
export default blogReducer;
