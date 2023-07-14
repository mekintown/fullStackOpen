import { createSlice } from "@reduxjs/toolkit";

const initialState = "Hello :)";

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		setNotification(state, action) {
			return action.payload;
		},
	},
});

export const displayNotification = (content, timeout) => {
	return (dispatch) => {
		dispatch(setNotification(content));
		setTimeout(() => {
			dispatch(setNotification(""));
		}, timeout);
	};
};

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
