const Author = require("../models/author");
const Book = require("../models/book");

module.exports.typeDefs = `
	extend type Query {
		authorCount: Int!
		allAuthors: [Author!]!
	}
	type Author {
		name: String!
		id: ID!
		born: Int
		bookCount: Int!
	}
	extend type Mutation {
		editAuthor(name: String!, setBornTo: Int!): Author
	}
`;

module.exports.resolvers = {
	Query: {
		authorCount: () => Author.collection.countDocuments(),
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
		editAuthor: async (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new GraphQLError("wrong credentials", {
					extensions: { code: "BAD_USER_INPUT" },
				});
			}

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
