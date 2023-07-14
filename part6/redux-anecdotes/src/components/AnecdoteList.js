import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

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
		dispatch(vote(anecdote.id));
		dispatch(setNotification(`you voted ${anecdote.content}`));
		setTimeout(() => {
			dispatch(setNotification(""));
		}, 5000);
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
