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