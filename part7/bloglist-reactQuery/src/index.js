import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationProvider } from "./NotificationContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "./UserContext";
<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
/>;

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
