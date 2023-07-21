import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "SET":
			return action.payload;
		case "CLEAR":
			return null;
		default:
			return state;
	}
};

const NotificationContext = createContext();

export const NotificationProvider = (props) => {
	const [notification, setNotification] = useReducer(notificationReducer, null);

	return (
		<NotificationContext.Provider value={[notification, setNotification]}>
			{props.children}
		</NotificationContext.Provider>
	);
};

export const useNotificationValue = () => {
	const [notification] = useContext(NotificationContext);
	return notification;
};

export const useNotify = () => {
	const valueAndDispatch = useContext(NotificationContext);
	const dispatch = valueAndDispatch[1];
	return (payload) => {
		dispatch({ type: "SET", payload });
		setTimeout(() => {
			dispatch({ type: "CLEAR" });
		}, 5000);
	};
};

export default NotificationContext;
