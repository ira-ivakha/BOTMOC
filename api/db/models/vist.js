'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vist = sequelize.define(
    'Vist',
    {
      ip: DataTypes.STRING,
      userAgent: DataTypes.STRING,
      acceptLanguage: DataTypes.STRING,
      locationData: DataTypes.JSON(DataTypes.STRING),
    },
    {},
  );
  Vist.associate = function(models) {
    // associations can be defined here
  };
  return Vist;
};
