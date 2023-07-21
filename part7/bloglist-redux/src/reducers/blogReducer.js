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
	},
});

export const initializeBlog = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		blogs.sort((a, b) => b.likes - a.likes);
		dispatch(setBlog(blogs));
	};
};

export const createBlog = (newBlog) => {
	return async (dispatch) => {
		const returnedBlog = await blogService.create(newBlog);
		dispatch(appendBlog(returnedBlog));
	};
};

export const { appendBlog, setBlog } = blogSlice.actions;

const blogReducer = blogSlice.reducer;
export default blogReducer;
