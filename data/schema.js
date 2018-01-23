import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';


const typeDefs = `
type User {
  id: Int,
  first_name: String,
  last_name: String,
  email: String,
  point_balance: Int
  subscriptions: [Subscription]
}

scalar Date

type Subscription {
  name: String,
  is_active: Boolean,
  next_ship_date: Date
}
`;

const schema = makeExecutableSchema({ typeDefs });

export default schema;
