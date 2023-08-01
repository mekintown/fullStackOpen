const { merge } = require("lodash");
const { typeDefs: Author, resolvers: authorResolvers } = require("./author.js");
const { typeDefs: Book, resolvers: bookResolvers } = require("./book.js");
const { typeDefs: User, resolvers: userResolvers } = require("./user.js");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const Query = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`;

const resolvers = {};

const schema = makeExecutableSchema({
	typeDefs: [Query, Author, Book, User],
	resolvers: merge(resolvers, authorResolvers, bookResolvers, userResolvers),
});

module.exports = schema;
