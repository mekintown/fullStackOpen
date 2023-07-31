import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { CURRENT_USER } from "../queries";
import { useEffect, useState } from "react";

const Recommendation = ({ show }) => {
	const currentUserResult = useQuery(CURRENT_USER);
	const [currentUser, setCurrentUser] = useState(null);
	const result = useQuery(ALL_BOOKS, {
		variables: { genre: currentUser },
	});

	useEffect(() => {
		if (currentUserResult.data?.me) {
			setCurrentUser(currentUserResult.data.me.favoriteGenre);
		}
	}, [currentUserResult]);

	if (!show) {
		return null;
	}

	if (result.loading) {
		return <div>loading...</div>;
	}

	const books = result.data.allBooks;

	return (
		<div>
			<h2>Recommendations</h2>

			<p>
				books in your favorite genre <strong> {currentUser} </strong>
			</p>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Recommendation;
