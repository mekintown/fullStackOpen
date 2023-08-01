const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports.typeDefs = `
	extend type Query {
		me: User
	}
	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

	extend type Mutation {
		createUser(username: String!, favoriteGenre: String!): User
		login(username: String!, password: String!): Token
	}
`;

module.exports.resolvers = {
	Query: {
		me: (root, args, context) => {
			return context.currentUser;
		},
	},
	Mutation: {
		createUser: async (root, args) => {
			const user = new User({ ...args });

			try {
				user.save();
			} catch (error) {
				throw new GraphQLError("Creating the user failed", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args.name,
						error,
					},
				});
			}

			return user;
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== "secret") {
				throw new GraphQLError("wrong credentials", {
					extensions: { code: "BAD_USER_INPUT" },
				});
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},
	},
};
