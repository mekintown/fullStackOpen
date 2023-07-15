import { useQuery } from "react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdote } from "./request";

const App = () => {
	const { isLoading, isError, data, error } = useQuery(
		"anecdotes",
		getAnecdote,
		{
			retry: 1,
		}
	);
	if (isLoading) {
		return <span>Loading...</span>;
	} else if (isError) {
		return <span>Error: {error.message}</span>;
	}

	const anecdotes = data;

	const handleVote = (anecdote) => {
		console.log("vote");
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
