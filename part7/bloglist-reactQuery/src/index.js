import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationProvider } from "./NotificationContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "./UserContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<UserProvider>
			<NotificationProvider>
				<App />
			</NotificationProvider>
		</UserProvider>
	</QueryClientProvider>
);
