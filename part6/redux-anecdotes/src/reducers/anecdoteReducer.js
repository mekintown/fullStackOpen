const anecdotesAtStart = [
	"If it hurts, do it more often",
	"Adding manpower to a late software project makes it later!",
	"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
	"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
	"Premature optimization is the root of all evil.",
	"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0,
	};
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "VOTE":
			const anecdoteToChange = state.find(
				(anecdote) => anecdote.id === action.payload.id
			);
			const changedAnecdote = {
				...anecdoteToChange,
				votes: anecdoteToChange.votes + 1,
			};
			const newState = state.map((oldAnecdote) =>
				oldAnecdote.id !== action.payload.id ? oldAnecdote : changedAnecdote
			);
			return newState.sort((a, b) => b.votes - a.votes);
		case "CREATE_ANECDOTE":
			return [...state, action.payload];
		default:
			return state;
	}
};

export const vote = (id) => {
	return {
		type: "VOTE",
		payload: { id },
	};
};

export const createAnecdote = (content) => {
	return {
		type: "CREATE_ANECDOTE",
		payload: {
			content,
			id: getId(),
			votes: 0,
		},
	};
};

export default reducer;
