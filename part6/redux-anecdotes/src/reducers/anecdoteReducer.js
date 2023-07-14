import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		createAnecdote(state, action) {
			const content = action.payload;
			return [
				...state,
				{
					content,
					id: getId(),
					votes: 0,
				},
			];
		},
		vote(state, action) {
			const id = action.payload;
			const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
			const changedAnecdote = {
				...anecdoteToChange,
				votes: anecdoteToChange.votes + 1,
			};
			const newState = state.map((oldAnecdote) =>
				oldAnecdote.id !== id ? oldAnecdote : changedAnecdote
			);
			return newState.sort((a, b) => b.votes - a.votes);
		},
		setAnecdote(state, action) {
			return action.payload;
		},
	},
});

export const { createAnecdote, vote, setAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
