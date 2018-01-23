import { User, Subscription, Box, Product } from './connectors'

// from https://www.apollographql.com/docs/graphql-tools/scalars.html#Date-as-a-scalar
const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: 'Date scalar',
    parseValue(value){
      return new Date(value);
    },
    serialize(value){
      return value.getTime()
    },
    parseLiteral(ast: any) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  }),
  Query: {
    user(root, args){},
    currentUser(){}
  },
  User: {
    subscriptions(user){}
  },
  Subscription: {
    box_history(subscription){}
  },
  Box: {
    samples(box){}
  }
}
