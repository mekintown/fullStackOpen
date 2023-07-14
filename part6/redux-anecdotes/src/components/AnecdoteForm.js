import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { displayNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const handleSubmitAnecdote = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		dispatch(createAnecdote(content));
		dispatch(displayNotification(`you voted ${content}`, 5000));
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={handleSubmitAnecdote}>
				<div>
					<input name="anecdote" />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
