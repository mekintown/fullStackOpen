import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdote";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		appendAnecdote(state, action) {
			const newAnecdote = action.payload;
			return [...state, newAnecdote];
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

export const initializeAnecdote = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdote(anecdotes));
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.create(content);
		dispatch(appendAnecdote(newAnecdote));
	};
};

export const { appendAnecdote, vote, setAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
