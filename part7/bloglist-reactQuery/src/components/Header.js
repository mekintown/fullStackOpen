import loginService from "../services/login";
import { useLogout, useUserValue } from "../UserContext";
import { Link } from "react-router-dom";

const Header = () => {
	const logout = useLogout();
	const user = useUserValue();

	const handleLogoutClick = () => {
		loginService.logout();
		logout();
	};

	const linkStyle = {
		marginRight: "20px",
		color: "black",
		textDecoration: "none",
		fontSize: "18px",
	};

	const buttonStyle = {
		backgroundColor: "blue",
		color: "white",
		padding: "10px 20px",
		borderRadius: "20px",
		border: "none",
		cursor: "pointer",
		fontSize: "16px",
	};

	const headerStyle = {
		backgroundColor: "#f5f5f5",
		padding: "10px 20px",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		boxShadow: "0px 3px 6px #00000029",
	};

	return (
		<div style={headerStyle}>
			<div>
				<Link to="/" style={linkStyle}>
					blogs
				</Link>
				<Link to="/users" style={linkStyle}>
					users
				</Link>
			</div>
			<div>
				<p style={{ display: "inline-block", marginRight: "10px" }}>
					{user.username} logged in
				</p>
				<button style={buttonStyle} onClick={handleLogoutClick}>
					logout
				</button>
			</div>
		</div>
	);
};

export default Header;
