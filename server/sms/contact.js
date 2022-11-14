const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
const attributes = 
  {
    name: {field: "name",type: DataTypes.STRING,allowNull: true,},
    phoneNumber: {field: "phoneNumber",type: DataTypes.STRING,allowNull: true,},
    id: {field: "id",type: DataTypes.STRING(50),allowNull: true,primaryKey: true},
  };
return sequelize.define('text', attributes);
}