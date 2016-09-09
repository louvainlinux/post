'use strict';

var Sequelize = require('sequelize');
var config    = require('./db_config');

var sequelize = new Sequelize(config.db_dev);

module.exports.database = sequelize;
