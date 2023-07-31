import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";
import Recommendation from "./components/Recommendation";

const App = () => {
	const [page, setPage] = useState("authors");
	const [token, setToken] = useState(null);
	const client = useApolloClient();

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
		setPage(null);
	};

	return (
		<div>
			<div>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
				{token ? (
					<button onClick={() => setPage("add")}>add book</button>
				) : null}
				{token ? (
					<button onClick={() => setPage("recommend")}>recommend</button>
				) : null}
				{!token ? (
					<button onClick={() => setPage("login")}>login</button>
				) : null}
				{token ? <button onClick={logout}>logout</button> : null}
			</div>

			<Authors show={page === "authors"} />

			<Books show={page === "books"} />

			<NewBook show={page === "add"} />

			<LoginForm show={page === "login"} setToken={setToken} />

			{token ? <Recommendation show={page === "recommend"} /> : null}
		</div>
	);
};

export default App;
