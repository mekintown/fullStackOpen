import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdote = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (newAnecdote) =>
	axios.post(baseUrl, newAnecdote).then((res) => res.data);

export function updateAnecdote(updateAnecdote) {
	console.log(updateAnecdote);
	return axios
		.put(`${baseUrl}/${updateAnecdote.id}`, updateAnecdote)
		.then((res) => res.data);
}
