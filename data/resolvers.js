import { Kind } from 'graphql/language';
import { GraphQLScalarType } from 'graphql';
var models = require('../models');

// we could have _actual_ dates vs strings:
// from https://www.apollographql.com/docs/graphql-tools/scalars.html#Date-as-a-scalar
// + https://github.com/tjmehta/graphql-date/blob/master/index.js
const resolvers = {
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
