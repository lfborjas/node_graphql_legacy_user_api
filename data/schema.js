import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import resolvers from './resolvers';

// The schema doesn't have to be defined as a string, other people prefer using
// lower level objects due to the libs they use:
// https://github.com/gauravtiwari/graphql-server-examples/blob/master/javascript/express_graphql/api/schema.js
// But this schema was simple enough.
const typeDefs = `
scalar DateTime

type User {
  id: Int,
  email: String,
  group_id: Int,
  subscriptions: [Subscription]
}

type SubscriptionProfile {
  id: Int,
  subscriptionVerticalId: Int,
  shippingAddressId: Int,
  isPaused: Boolean
}

type Subscription {
  id: Int,
  subscriptionType: Int,
  status: Int,
  boxesRemaining: Int,
  nextShipDate: DateTime,
  createdAt: DateTime,
  updatedAt: DateTime,
  shippingFrequency: Int,
  isActive: Boolean,
  vertical: Int,
  subscriptionProfile: SubscriptionProfile
}

type Query {
  user(id: Int): User
}

`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
