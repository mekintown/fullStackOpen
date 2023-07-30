const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");
const { GraphQLError } = require("graphql");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connection to MongoDB:", error.message);
	});

const typeDefs = `
  type Book {
	title: String!
	author: Author!
	published: Int!
	id: ID!
	genres: [String!]!
  }
  type Author {
	name: String!
	id: ID!
	born: Int
	bookCount: Int!
  }
  type Query {
    bookCount: Int!
	authorCount: Int!
	allBooks(author: String, genre: String): [Book!]!
	allAuthors: [Author!]!
  }
  type Mutation {
	addBook(
		title: String!,
		author: String!,
		published: Int!,
		genres: [String!]!
	):Book

	editAuthor(
		name: String!,
		setBornTo: Int!
	): Author
  }
`;

const resolvers = {
	Query: {
		bookCount: () => Book.collection.countDocuments(),
		authorCount: () => Author.collection.countDocuments(),
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
		allAuthors: async () => {
			return await Author.find({});
		},
	},
	Author: {
		bookCount: async (root) => {
			const bookCount = await Book.countDocuments({ author: root._id });
			return bookCount;
		},
	},
	Mutation: {
		addBook: async (root, args) => {
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
			return book;
		},
		editAuthor: async (root, args) => {
			const author = await Author.findOne({ name: args.name });
			author.born = args.setBornTo;

			try {
				await author.save();
			} catch (error) {
				throw new GraphQLError("Editing birth year failed", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args.name,
						error,
					},
				});
			}

			return author;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
