import { Kind } from 'graphql/language';
import { GraphQLScalarType } from 'graphql';
var models = require('../models');

// we could have _actual_ dates vs strings:
// from https://www.apollographql.com/docs/graphql-tools/scalars.html#Date-as-a-scalar
// + https://github.com/tjmehta/graphql-date/blob/master/index.js



// Sequelize (GraphQL?) is smart enough to know that a scalar attribute in a type resolves to
// an attribute in a Sequelize object; so we only need to write resolvers
// for attributes for a type in the schema that aren't attributes in a model.
// This is good in the sense that a type doesn't have to map 1-to-1 to a model
// (which allows decoration, simplification, etc.; encapsulation, in short).
const resolvers = {
  Query: {
    user(root, args){
      // the graphql library knows to resolve this promise
      return models.user.findOne({where: args});
    }
  },
  User: {
    subscriptions(user){
      return user.getSubscriptions();
    }
  },
  Subscription: {
    // clearest example of a resolver acting as a decorator (in the "facade" sense
    // that rails decorators use): we define simple attributes that are
    // aliases/transformations of underlying attributes, or attributes of associated models
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
  },
  //FINALLY found a way to represent dates sanely: https://github.com/mickhansen/graphql-sequelize/issues/166#issuecomment-188553064
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'Standard Date Format: ISO-8601',
    serialize(d){
      if(!d) return null;
      if((d instanceof Date)){
        return d.toISOString();
      }
      return d;
    },
    parseValue(value){
      return new Date(value);
    },
    parseLiteral(ast){
      return new Date(ast.value);
    }
  })
}

export default resolvers;
