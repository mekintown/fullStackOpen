import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { displayNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
	const anecdotes = useSelector((state) =>
		state.filter
			? state.anecdotes.filter((anecdote) =>
					anecdote.content.includes(state.filter)
			  )
			: state.anecdotes
	);
	const dispatch = useDispatch();

	const handleVoteBtnClick = (anecdote) => {
		dispatch(voteAnecdote(anecdote));
		dispatch(displayNotification(`you voted ${anecdote.content}`, 5000));
	};

	return (
		<div>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVoteBtnClick(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default AnecdoteList;
