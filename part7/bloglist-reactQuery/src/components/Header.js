import { useEffect } from "react";
import LoginForm from "./LoginForm";
import blogService from "../services/blogs";
import loginService from "../services/login";
import Notification from "./Notification";
import { useLogin, useLogout, useUserValue } from "../UserContext";
import Blogs from "./Blogs";

const Home = () => {
	const login = useLogin();
	const logout = useLogout();
	const user = useUserValue();

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			login(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleLogoutClick = () => {
		loginService.logout();
		logout();
	};

	return (
		<div>
			<Notification />
			{user === null ? (
				<LoginForm />
			) : (
				<>
					<h2>blogs</h2>
					<p>
						{user.username} logged in{" "}
						<button onClick={handleLogoutClick}>logout</button>
					</p>
					<Blogs />
				</>
			)}
		</div>
	);
};

export default Home;
