import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useNotify } from "../NotificationContext";

const LoginForm = ({ setUser }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const notifyWith = useNotify();

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});
			window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

			blogService.setToken(user.token);

			setUser(user);
			setUsername("");
			setPassword("");
		} catch (exception) {
			notifyWith(exception.response.data.error);
		}
	};

	return (
		<>
			<h2>log in to application </h2>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</>
	);
};

export default LoginForm;
