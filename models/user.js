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
    User.hasMany(models.subscriptionProfile, {foreignKey: 'customer_id', sourceKey: 'entity_id'});
  }

  /*
  User.prototype.getSubscriptions = function getSubscriptions(){
    this.getSubscriptionProfiles({
      include: [
        {model: Subscription}
      ]
    }).then( subscription_profiles => {
      var reducer = (acc, profile) => acc.concat(profile.getSubscriptions());
      return subscription_profiles.reduce(reducer, []);
    });
  };
*/
  
  return User;
};

//NOTE: how would we deal with legacy EAVs such as first_name/last_name?
//maybe just like normal associations + http://docs.sequelizejs.com/manual/tutorial/models-definition.html#getters-setters
//TODO: example of an EAV?
