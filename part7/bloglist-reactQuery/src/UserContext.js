import { createContext, useContext, useReducer } from "react";

const userReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return action.payload;
		case "LOGOUT":
			return null;
		default:
			return state;
	}
};

const UserContext = createContext();

export const UserProvider = (props) => {
	const [user, dispatch] = useReducer(userReducer, null);

	return (
		<UserContext.Provider value={[user, dispatch]}>
			{props.children}
		</UserContext.Provider>
	);
};

export const useUserValue = () => {
	const [user] = useContext(UserContext);
	return user;
};

export const useLogin = () => {
	const valueAndDispatch = useContext(UserContext);
	const dispatch = valueAndDispatch[1];
	return (payload) => {
		dispatch({ type: "LOGIN", payload });
	};
};

export const useLogout = () => {
	const valueAndDispatch = useContext(UserContext);
	const dispatch = valueAndDispatch[1];
	return () => {
		dispatch({ type: "LOGOUT" });
	};
};

export default UserContext;
