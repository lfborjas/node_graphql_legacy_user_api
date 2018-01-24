import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = `
scalar Date

type User {
  id: Int,
  email: String,
  group_id: Int,
  subscriptions: [Subscription]
}

type Subscription {
  name: String,
  is_active: Boolean,
  vertical: Int,
  next_ship_date: Date
}

type Query {
  user(id: Int): User
}

`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
