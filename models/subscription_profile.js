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
    tableName: 'customer_subscription_profile'
  });

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
