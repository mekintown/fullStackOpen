import axios from "axios";

export const getAnecdote = () =>
	axios.get("http://localhost:3001/anecdotes").then((res) => res.data);
