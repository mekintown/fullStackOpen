import userService from "../services/users";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const User = () => {
	const {
		data: users,
		isLoading,
		isError,
		isFetching,
	} = useQuery("users", userService.getAll);

	const id = useParams().id;

	if (isFetching) {
		return <div>Fetching</div>;
	}
	const user = users.find((user) => user.id === id);

	if (isLoading) return <div>loading data...</div>;

	if (isError)
		return <div>user service not available due to problems in server</div>;
	return (
		<div>
			<h2>{user.username}</h2>
			<h3>added blogs</h3>
			<ul>
				{user.blogs.map((blog) => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</div>
	);
};

export default User;
