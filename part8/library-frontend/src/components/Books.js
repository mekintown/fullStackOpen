import { useQuery, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "../queries";
import { useEffect, useState } from "react";

const Books = (props) => {
	const [selectedGenre, setSelectedGenre] = useState(null);
	const [allGenres, setAllGenres] = useState(null);

	const result = useQuery(ALL_BOOKS, {
		variables: { genre: selectedGenre },
	});

	const allBooksResult = useQuery(ALL_BOOKS);
	useEffect(() => {
		if (allBooksResult.data) {
			const genres = allBooksResult.data.allBooks.map((book) => book.genres);
			const uniqueGenres = [...new Set(genres.flat())];
			setAllGenres(uniqueGenres);
		}
	}, [allBooksResult.data]);

	useEffect(() => {
		result.refetch();
	}, [selectedGenre]);

	useSubscription(BOOK_ADDED, {
		onData: ({ data }) => {
			alert(`book added ${data.data.bookAdded.title}`);
		},
	});

	if (!props.show) {
		return null;
	}

	if (result.loading) {
		return <div>loading...</div>;
	}

	const books = result.data.allBooks;

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
			{allGenres.map((genre) => (
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
