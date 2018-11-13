'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      locationData: DataTypes.JSON(DataTypes.STRING),
      userAgent: DataTypes.STRING,
      acceptLanguage: DataTypes.STRING,
    },
    {},
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
