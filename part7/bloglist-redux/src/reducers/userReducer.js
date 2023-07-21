import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const userSlice = createSlice({
	name: "user",
	initialState: "",
	reducers: {
		setUser(state, action) {
			return action.payload;
		},
	},
});

export const setUserAndToken = (user) => {
	return (dispatch) => {
		dispatch(setUser);
		blogService.setToken(user.token);
	};
};
export const { setUser } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
