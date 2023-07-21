import userService from "../services/users";
import { useQuery } from "react-query";

const Users = () => {
	const {
		data: users,
		isLoading,
		isError,
	} = useQuery("users", userService.getAll);
	console.log(users);

	if (isLoading) return <div>loading data...</div>;

	if (isError)
		return <div>user service not available due to problems in server</div>;

	return (
		<div>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>blog created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>{user.username}</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Users;
