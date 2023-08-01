const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Author = require("../models/author");
const Book = require("../models/book");

module.exports.typeDefs = `
	extend type Query {
		bookCount: Int!
		allBooks(author: String, genre: String): [Book!]!
	}
	type Book {
		title: String!
		author: Author!
		published: Int!
		id: ID!
		genres: [String!]!
	}
	extend type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]!
		): Book
	}

	extend type Subscription {
		bookAdded: Book!
	}
`;

module.exports.resolvers = {
	Query: {
		bookCount: () => Book.collection.countDocuments(),
		allBooks: async (root, args) => {
			const filter = {};

			if (args.author) {
				const author = await Author.findOne({ name: args.author });
				if (author) {
					filter.author = author._id;
				} else {
					// If the author doesn't exist, return an empty array of books.
					return [];
				}
			}

			if (args.genre) {
				filter.genres = args.genre;
			}

			return await Book.find(filter).populate("author", {
				name: 1,
				born: 1,
			});
		},
	},
	Mutation: {
		addBook: async (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new GraphQLError("wrong credentials", {
					extensions: { code: "BAD_USER_INPUT" },
				});
			}

			let author = await Author.findOne({ name: args.author });

			if (!author) {
				// If the author does not exist, create a new author
				author = new Author({ name: args.author });
				await author.save();
			}

			// Create and save the book
			const book = new Book({ ...args, author: author._id });
			try {
				await book.save();
			} catch (error) {
				throw new GraphQLError("Saving book failed", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args.title,
						error,
					},
				});
			}

			await book.populate("author", {
				name: 1,
				born: 1,
			});

			pubsub.publish("BOOK_ADDED", { bookAdded: book });

			return book;
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
		},
	},
};
