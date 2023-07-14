import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import { setAnecdote } from "./reducers/anecdoteReducer";
import anecdoteService from "./services/anecdote";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<App />
	</Provider>
);

anecdoteService
	.getAll()
	.then((anecdotes) => store.dispatch(setAnecdote(anecdotes)));
