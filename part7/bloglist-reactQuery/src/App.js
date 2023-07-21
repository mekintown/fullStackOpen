import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLogin, useLogout, useUserValue } from "./UserContext";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useEffect } from "react";

import Users from "./components/Users";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import User from "./components/User";

const App = () => {
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
				</>
			)}
			<Router>
				<Routes>
					<Route path="/" element={<Blogs />} />
					<Route path="/users" element={<Users />} />
					<Route path="/users/:id" element={<User />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
