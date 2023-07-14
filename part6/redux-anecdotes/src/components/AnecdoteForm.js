import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdote";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const handleSubmitAnecdote = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		const newAnecdote = await anecdoteService.create(content);
		dispatch(createAnecdote(newAnecdote));
		dispatch(setNotification(`you created ${newAnecdote.content}`));
		setTimeout(() => {
			dispatch(setNotification(""));
		}, 5000);
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
