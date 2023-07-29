import { useState } from "react";
import { ALL_AUTHORS } from "../queries";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_BIRTHYEAR } from "../queries";

const AuthorForm = () => {
	const [author, setAuthor] = useState("");
	const [born, setBorn] = useState("");

	const [editBirthYear] = useMutation(EDIT_BIRTHYEAR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		editBirthYear({ variables: { name: author, setBornTo: parseInt(born) } });
		setAuthor("");
		setBorn("");
	};

	const { loading, error, data } = useQuery(ALL_AUTHORS);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<div>
			<h2>Set birthyear</h2>
			<form onSubmit={handleSubmit}>
				<label>
					name
					<select
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					>
						{data.allAuthors.map((author) => (
							<option value={author.name} key={author.id}>
								{author.name}
							</option>
						))}
					</select>
				</label>
				<label>
					born
					<input
						value={born}
						onChange={({ target }) => setBorn(target.value)}
					></input>
				</label>
				<button type="submit">update Author</button>
			</form>
		</div>
	);
};

const Authors = (props) => {
	const result = useQuery(ALL_AUTHORS);
	if (!props.show) {
		return null;
	}

	if (result.loading) {
		return <div>loading...</div>;
	}

	const authors = result.data.allAuthors;

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<AuthorForm />
		</div>
	);
};

export default Authors;
