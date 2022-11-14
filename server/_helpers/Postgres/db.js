const { Sequelize } = require('sequelize');
const { Pool } = require('pg');

const config = require('config');

module.exports = db = {};

initialize();

const pool = new Pool({
    connectionString: 'postgres://lpepcfltwpipdr:8f6bd389e710279702e7fc32cd16cefc0c8c7fedad602e72c7ff9f0743a45f2c@ec2-23-23-164-251.compute-1.amazonaws.com:5432/dbdhcjkbf7mq10',
    ssl: {rejectUnauthorized: false}
  });
  pool.connect((err, client, release) => {if (err) {return console.error('Error acquiring client', err.stack)}
  
    client.query(`SELECT 'PostgreSQL RUNNING' || NOW() as test`, (err, result) => {release()
  if (err) {return console.error('Error executing query', err.stack)}console.log(result.rows[0].test)})
    }
  );

async function initialize() {
    const { host, port, user, password, database } = config.database;
    const sequelize = new Sequelize(database, user, password, {
        host: host,
        dialect: 'postgres',
        ssl: true,
        protocol: "postgres",
    logging: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // <<<<<< YOU NEED THIS
        }
    }
}


);

  

    // init models and add them to the exported db object
    db.Text = require('../models/text')(sequelize);
    //db.Account = require('../models/account')(sequelize);
    //db.RefreshToken = require('../models/refresh-token')(sequelize);

    // define relationships
    //db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    //db.RefreshToken.belongsTo(db.Account);
    
    // sync all models with database
    await sequelize.sync();
}
module.exports = {query: (text, params, callback) => {return pool.query(text, params, callback)}}
