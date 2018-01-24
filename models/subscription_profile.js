'use strict';
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
    tableName: 'customer_subscription_profile',
    classMethods: {
      associate: function(models){
        SubscriptionProfile.User = SubscriptionProfile.belongsTo(
          models.User, {
            foreignKey: 'customer_id', targetKey: 'entity_id'
          }
        );
        SubscriptionProfile.Subscriptions = SubscriptionProfile.hasMany(
          models.Subscription, {
            foreignKey: 'customer_subscription_profile_id',
            sourceKey: 'id'
          }
        );
      }
    }
  });
  return SubscriptionProfile;
};
