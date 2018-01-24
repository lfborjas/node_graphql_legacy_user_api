import { Kind } from 'graphql/language';
import { GraphQLScalarType } from 'graphql';
var models = require('../models');

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
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  }),
  Query: {
    user(root, args){
      return models.user.findOne({where: args});
    }
  },
  User: {
    subscriptions(user){
      return user.getSubscriptions();
    }
  },
  Subscription: {
    //this could act as a "decorator"
    vertical(sub){
      return sub.getSubscriptionProfile().then(profile=>{
        return profile.subscriptionVerticalId;
      });
    },
    isActive(sub){
      return sub.status == 1;
    },
    subscriptionProfile(sub){
      return sub.getSubscriptionProfile();
    }
  }
}

export default resolvers;
