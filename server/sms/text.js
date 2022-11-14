const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
const attributes = 
  {
    isSent: {field: "isSent",         type: DataTypes.BOOLEAN,allowNull: false,},
    isReceived: {field: "isReceived", type: DataTypes.BOOLEAN,allowNull: false,},
    name: {field: "name",type: DataTypes.STRING,allowNull: true,},
    phoneNumber: {field: "phoneNumber",type: DataTypes.STRING,allowNull: true,},
    message: {field: "message",type: DataTypes.STRING,allowNull: true,},
    id: {field: "id",type: DataTypes.STRING(50),allowNull: true,primaryKey: true},
  };
return sequelize.define('text', attributes);
}