import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useEffect, useState } from "react";

const Books = (props) => {
	const [selectedGenre, setSelectedGenre] = useState(null);
	const [fetchedGenres, setFetchedGenres] = useState([]);

	const result = useQuery(ALL_BOOKS, {
		variables: { genre: selectedGenre },
	});

	useEffect(() => {
		result.refetch();
	}, [selectedGenre]);

	if (!props.show) {
		return null;
	}

	if (result.loading) {
		return <div>loading...</div>;
	}

	const books = result.data.allBooks;

	if (fetchedGenres.length === 0) {
		const genres = books.map((book) => book.genres);
		const uniqueGenres = [...new Set(genres.flat())];
		setFetchedGenres(uniqueGenres);
	}

	const handleGenreClick = ({ target }) => {
		setSelectedGenre(target.value);
	};

	return (
		<div>
			<h2>books</h2>

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
			{fetchedGenres.map((genre) => (
				<button value={genre} key={genre} onClick={handleGenreClick}>
					{genre}
				</button>
			))}
			<button value={null} onClick={handleGenreClick}>
				all genres
			</button>
		</div>
	);
};

export default Books;
