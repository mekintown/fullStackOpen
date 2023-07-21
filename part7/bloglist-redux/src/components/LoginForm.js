import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { displayNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});
			window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

			blogService.setToken(user.token);

			dispatch(setUser(user));
			setUsername("");
			setPassword("");
		} catch (exception) {
			displayNotification(exception.response.data.error, 5000);
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
