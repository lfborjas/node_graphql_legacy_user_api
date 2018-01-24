import { Kind } from 'graphql/language';
import { GraphQLScalarType } from 'graphql';
import models from '../models';

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
    user(root, args){
      return User.findOne(where: args)
    }
  },
  User: {
    subscriptions(user){
      return user.getSubscriptions();
    }
  },
  Subscription: {
    
  }
}
