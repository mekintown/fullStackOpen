import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../request";
import { useNotificationDispatch } from "./NotificaitonContext";

const AnecdoteForm = () => {
	const queryClient = useQueryClient();
	const dispatch = useNotificationDispatch();
	const newAnecdoteMutation = useMutation(createAnecdote, {
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData("anecdotes");
			queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));

			dispatch({
				type: "SET_NOTIFICATION",
				payload: `You created ${newAnecdote.content}`,
			});

			setTimeout(() => {
				dispatch({ type: "CLEAR_NOTIFICATION" });
			}, 5000);
		},
		onError: (error) => {
			dispatch({
				type: "SET_NOTIFICATION",
				payload: error.response.data.error,
			});

			setTimeout(() => {
				dispatch({ type: "CLEAR_NOTIFICATION" });
			}, 5000);
		},
	});

	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.value = "";
		newAnecdoteMutation.mutate({ content, votes: 0 });
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
