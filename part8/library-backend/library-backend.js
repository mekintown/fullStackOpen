const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");

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
		allBooks: (root, args) => {
			const filter = {};

			if (args.author) {
				filter.author = args.author;
			}

			if (args.genre) {
				filter.genres = args.genre;
			}

			return Book.find(filter);
		},
		allAuthors: () => {
			return Author.find({});
		},
	},
	Author: {
		bookCount: (root) => {
			return Book.countDocuments({ author: root.name });
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
			await book.save();

			await book.populate("author", {
				name: 1,
				born: 1,
			});
			return book;
		},
		editAuthor: async (root, args) => {
			const author = await Author.findOne({ name: args.author });
			author.born = args.setBornTo;

			try {
				await author.save();
			} catch (error) {}

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
