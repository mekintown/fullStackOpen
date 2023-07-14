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
		updateAnecdote(state, action) {
			const { id, changedAnecdote } = action.payload;
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

export const voteAnecdote = (anecdote) => {
	return async (dispatch) => {
		const changedAnecdote = await anecdoteService.update(anecdote.id, {
			...anecdote,
			votes: anecdote.votes + 1,
		});
		dispatch(updateAnecdote({ id: anecdote.id, changedAnecdote }));
	};
};

export const { appendAnecdote, updateAnecdote, setAnecdote } =
	anecdoteSlice.actions;
export default anecdoteSlice.reducer;
