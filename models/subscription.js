'use strict';
// these type definitions are verbose mostly because we're dealing with a legacy
// database that doesn't follow the opinions that Sequelize has:
// http://docs.sequelizejs.com/manual/advanced/legacy.html

module.exports = (sequelize, DataTypes) => {
  var Subscription = sequelize.define('subscription', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orderItemId: {
      type: DataTypes.INTEGER,
      field: "order_item_id"
    },
    subscriptionType: {
      type: DataTypes.INTEGER,
      field: "subscription_type"
    },
    status: DataTypes.INTEGER,
    nextShipDate: {
      type: DataTypes.DATE,
      field: "next_ship_date"
    },
    boxesRemaining: {
      type: DataTypes.INTEGER,
      field: "boxes_remaining"
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at"
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at"
    },
    customerSubscriptionProfileId: {
      type: DataTypes.INTEGER,
      field: "customer_subscription_profile_id"
    },
    shippingFrequency: {
      type: DataTypes.INTEGER,
      field: "shipping_frequency"
    }
  }, {
    timestamps: false,
    tableName: "subscriptions",
  });

  Subscription.associate = function(models){
    Subscription.SubscriptionProfile = Subscription.belongsTo(
      //we're using the name given to sequelize.define here, not the
      //actual class name (which would be SubscriptionProfile)
      models.subscriptionProfile,
      {foreignKey: 'customer_subscription_profile_id',
       targetKey: 'id'}
    );
  }

  return Subscription;
};
