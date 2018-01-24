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
    classMethods: {
      associate: function(models) {
        User.SubscriptionProfiles = User.hasMany(models.SubscriptionProfiles, {foreignKey: 'customer_id', sourceKey: 'entity_id'});
      }
    }
  });
  return User;
};

//NOTE: how would we deal with legacy EAVs such as first_name/last_name?
//maybe just like normal associations + http://docs.sequelizejs.com/manual/tutorial/models-definition.html#getters-setters
//TODO: example of an EAV?
