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
  nextShipDate: String,
  createdAt: String,
  updatedAt: String,
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
