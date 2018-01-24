'use strict';
// these type definitions are verbose mostly because we're dealing with a legacy
// database that doesn't follow the opinions that Sequelize has:
// http://docs.sequelizejs.com/manual/advanced/legacy.html
module.exports = (sequelize, DataTypes) => {
  var SubscriptionProfile = sequelize.define('subscriptionProfile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      field: 'customer_id'
    },
    subscriptionVerticalId: {
      type: DataTypes.INTEGER,
      field: 'subscription_vertical_id'
    },
    shippingAddressId: {
      type: DataTypes.INTEGER,
      field: 'shipping_address_id'
    },
    isPaused: {
      type: DataTypes.BOOLEAN,
      field: 'is_paused'
    }
  }, {
    timestamps: false,
    tableName: 'customer_subscription_profile'
  });

  // This is the v4 way of defining associations, classMethods is no longer
  // accepted as a model option and will be ignored:
  // http://docs.sequelizejs.com/manual/tutorial/upgrade-to-v4.html
  // note that we're using lower snake case keys here, but they're really referencing
  // the lowerCamelCase attributes in the models (vs the actual column names), Sequelize is just
  // generous enough to seamlessly translate those for us
  SubscriptionProfile.associate = function(models){
    SubscriptionProfile.belongsTo(
      models.user, {
        foreignKey: 'customer_id', targetKey: 'id'
      }
    );
    SubscriptionProfile.hasMany(
      models.subscription, {
        foreignKey: 'customer_subscription_profile_id',
        sourceKey: 'id'
      }
    );
  }
  
  return SubscriptionProfile;
};
