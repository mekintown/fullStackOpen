import { useQuery, useMutation, useQueryClient } from "react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdote, updateAnecdote } from "./request";
import { useNotificationDispatch } from "./components/NotificaitonContext";

const App = () => {
	const queryClient = useQueryClient();
	const dispatch = useNotificationDispatch();
	const updateMutation = useMutation(updateAnecdote, {
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData("anecdotes");
			queryClient.setQueryData(
				"anecdotes",
				anecdotes.map((oldAnecdote) =>
					oldAnecdote.id !== newAnecdote.id ? oldAnecdote : newAnecdote
				)
			);
		},
	});

	const { isLoading, isError, data, error } = useQuery(
		"anecdotes",
		getAnecdote,
		{
			retry: 1,
			refetchOnWindowFocus: false,
		}
	);
	if (isLoading) {
		return <span>Loading...</span>;
	} else if (isError) {
		return <span>Error: {error.message}</span>;
	}

	const anecdotes = data;

	const handleVote = (anecdote) => {
		updateMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
		dispatch({
			type: "SET_NOTIFICATION",
			payload: `you voted ${anecdote.content}`,
		});

		setTimeout(() => {
			dispatch({ type: "CLEAR_NOTIFICATION" });
		}, 5000);
	};

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
