'use strict';

var config    = require('./db_config');

var knex = require('knex')({
	client: config.client,
	connection: {
		host: config.host,
		user: config.user,
		password: config.password,
		database: config.database,
		charset: config.charset
	}
});

module.exports.knex = knex;

/*

The require('./db_config') is for a non tracked file db_config.js
in the same folder with the following content:

module.exports = {
    client: 'mysql',
    host: '127.0.0.1',
    user: '<user>',
    password: '<password>',
    database: '<db_name>',
    charset: 'utf8'
};


*/