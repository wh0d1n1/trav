const config = require('../../config/config.json');
const { Sequelize } = require('sequelize');
const { Pool } = require('pg');
const connstring = 'postgres://uzqlwzhdgzfavu:9f7d5e86a6ed057744a25dc01ba4d47ed968319196d2e897c136410f54718697@ec2-23-23-151-191.compute-1.amazonaws.com:5432/ddd00bkpl9cj4q'
module.exports = db = {};

initialize();


async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const sequelize = new Sequelize(database, user, password, {
        host: host,
        port: 5432,
        dialect: 'postgres',
        //dialectOptions: {
        //ssl: {
        //    require: true,
        //    rejectUnauthorized: false // <<<<<< YOU NEED THIS
        //}
    });

    // init models and add them to the exported db object
    db.Account = require('../accounts/account.model')(sequelize);
    db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);

    // define relationships
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);
    
    // sync all models with database
    await sequelize.sync();
}



module.exports = {query: (text, params, callback) => {return pool.query(text, params, callback)}}
/*
async function prod_initialize() {
    const cof = {
      host: "ec2-23-23-164-251.compute-1.amazonaws.com",
      port: 5432,
      user: "lpepcfltwpipdr",
      password: "8f6bd389e710279702e7fc32cd16cefc0c8c7fedad602e72c7ff9f0743a45f2c",
      database: "dbdhcjkbf7mq10"
    }
  
  
  
      const { host, port, user, password, database } = cof;
      const sequelize = new Sequelize(database, user, password, {
          host: host,
          dialect: 'postgres',
          //ssl: true,
          //protocol: "postgres",
          //logging: true,
          //dialectOptions: {
          //ssl: {
          //    require: true,
          //    rejectUnauthorized: false // <<<<<< YOU NEED THIS
          //}
      }
  );
  */