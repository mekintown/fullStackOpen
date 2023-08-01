import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import { useEffect, useState } from "react";

const LoginForm = ({ show, setToken, setPage }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [login, result] = useMutation(LOGIN);

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value;
			setToken(token);
			localStorage.setItem("library-user-token", token);
		}
	}, [result.data]); // eslint-disable-line

	if (!show) {
		return null;
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		login({ variables: { username, password } });
		setPage(null);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">username</label>
				<input
					value={username}
					onChange={({ target }) => setUsername(target.value)}
					id="username"
				></input>
				<label htmlFor="password">password</label>
				<input
					value={password}
					onChange={({ target }) => setPassword(target.value)}
					id="password"
				></input>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default LoginForm;
