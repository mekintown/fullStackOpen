import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? "none" : "" };
	const showWhenVisible = { display: visible ? "" : "none" };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	useImperativeHandle(ref, () => ({
		toggleVisibility,
	}));

	const buttonStyle = {
		backgroundColor: "#0277bd",
		color: "#ffffff",
		padding: "0.5em 1em",
		borderRadius: "4px",
		border: "none",
		cursor: "pointer",
		marginTop: "1em",
	};

	const containerStyle = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginTop: "1em",
		width: "100vw",
	};

	return (
		<div style={containerStyle}>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility} style={buttonStyle}>
					{buttonLabel}
				</button>
			</div>
			<div style={showWhenVisible}>
				{children}
				<button onClick={toggleVisibility} style={buttonStyle}>
					Cancel
				</button>
			</div>
		</div>
	);
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
