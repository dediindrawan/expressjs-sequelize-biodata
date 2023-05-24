const Sequelize = require('sequelize');
const biodataConnection = new Sequelize(
    'bio_data_db',
    'root',
    '',
    {
        host: '127.0.0.1',
        dialect: 'mysql'
    }
);

const profile = require('./bio.model')(biodataConnection, Sequelize);

const db = {};
db.Sequelize = Sequelize; // dependency's property
db.biodataConnection = biodataConnection; // property
db.profile = profile; // models's property

module.exports = db;