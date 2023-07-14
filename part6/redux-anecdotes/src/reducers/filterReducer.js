import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		// here is the change
		filterChange(state, action) {
			return action.payload;
		},
	},
});

export const { filterChange } = filterSlice.actions;
export default filterSlice.reducer;
