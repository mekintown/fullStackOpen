import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
			id
		}
	}
`;

export const ALL_BOOKS = gql`
	query allBooks($genre: String) {
		allBooks(genre: $genre) {
			title
			author {
				name
			}
			genres
			published
		}
	}
`;

export const CREATE_BOOK = gql`
	mutation createBook(
		$title: String!
		$author: String!
		$published: Int!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			title
			author {
				name
			}
			published
			genres
		}
	}
`;

export const EDIT_BIRTHYEAR = gql`
	mutation editBirthYear($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			id
			name
			born
		}
	}
`;

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`;
