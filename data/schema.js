import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import resolvers from './resolvers';

const typeDefs = `
scalar Date

type User {
  id: Int,
  first_name: String,
  last_name: String,
  email: String,
  point_balance: Int,
  subscriptions: [Subscription]
}

type Subscription {
  name: String,
  is_active: Boolean,
  vertical: Int,
  next_ship_date: Date,
  box_history: [Box]
}

type Box {
  title: String,
  samples: [Product]
}

type Product{
  name: String,
  price: Float
}

type Query {
  user(id: Int): User
  currentUser: User
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
