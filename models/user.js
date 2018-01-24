'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "entity_id"
    },
    email: DataTypes.STRING,
    groupId: {
      type: DataTypes.INTEGER,
      field: "group_id"
    }
  }, {
    timestamps: false,
    tableName: "customer_entity",
  });

  User.associate = function(models){
    User.hasMany(models.subscriptionProfile, {foreignKey: 'customer_id', sourceKey: 'id'});

    //We're basically returning a flat array of subscriptions, using the eager loading
    //feature to not have too many nested promises: http://docs.sequelizejs.com/manual/tutorial/models-usage.html#nested-eager-loading
    User.prototype.getSubscriptions = function getSubscriptions(){
      return this.getSubscriptionProfiles({include: [{model: models.subscription}]}).
        then(profiles => {
          return profiles.reduce((acc, profile)=>acc.concat(profile.subscriptions), []);
        });
    }
  }
  
  return User;
};

//NOTE: how would we deal with legacy EAVs such as first_name/last_name?
//maybe just like normal associations + http://docs.sequelizejs.com/manual/tutorial/models-definition.html#getters-setters
//TODO: example of an EAV?
