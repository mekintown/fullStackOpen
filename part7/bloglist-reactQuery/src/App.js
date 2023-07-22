import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLogin, useUserValue } from "./UserContext";
import blogService from "./services/blogs";
import { useEffect } from "react";

import Users from "./components/Users";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import User from "./components/User";
import Blog from "./components/Blog";
import Header from "./components/Header";

const App = () => {
	const login = useLogin();
	const user = useUserValue();

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			login(user);
			blogService.setToken(user.token);
		}
	}, []);

	const appStyle = {
		fontFamily: "Poppins, sans-serif",
		display: "flex",
		flexDirection: "column",
		gap: "20px",
	};

	return (
		<div style={appStyle}>
			<Notification />
			{user === null ? (
				<LoginForm />
			) : (
				<>
					<Router>
						<Header />
						<Routes>
							<Route path="/" element={<Blogs />} />
							<Route path="/users" element={<Users />} />
							<Route path="/users/:id" element={<User />} />
							<Route path="/blogs/:id" element={<Blog />} />
						</Routes>
					</Router>
				</>
			)}
		</div>
	);
};

export default App;
