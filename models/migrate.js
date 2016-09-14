var knex = require('../config/database').knex;

var schema = {
	packages: require('./packages'),
	categories: require('./categories'),
	tags: require('./tags'),
	installs: require('./installs'),
	alternates: require('./alternates'),
	packages_categories: require('./packages_categories'),
	packages_tags: require('./packages_tags')
};

var sequence = require('when/sequence');
var _ = require('lodash');

function createTable(tableName) {
  return knex.schema.createTable(tableName, function (table) {
    var column;
    var columnKeys = _.keys(schema[tableName]);
    _.each(columnKeys, function (key) {
      if (schema[tableName][key].type === 'text' && schema[tableName][key].hasOwnProperty('fieldtype')) {
        column = table[schema[tableName][key].type](key, schema[tableName][key].fieldtype);
      }
      else if (schema[tableName][key].type === 'string' && schema[tableName][key].hasOwnProperty('maxlength')) {
        column = table[schema[tableName][key].type](key, schema[tableName][key].maxlength);
      }
      else {
        column = table[schema[tableName][key].type](key);
      }
      if (schema[tableName][key].hasOwnProperty('nullable') && schema[tableName][key].nullable === true) {
        column.nullable();
      }
      else {
        column.notNullable();
      }
      if (schema[tableName][key].hasOwnProperty('primary') && schema[tableName][key].primary === true) {
        column.primary();
      }
      if (schema[tableName][key].hasOwnProperty('unique') && schema[tableName][key].unique) {
        column.unique();
      }
      if (schema[tableName][key].hasOwnProperty('unsigned') && schema[tableName][key].unsigned) {
        column.unsigned();
      }
      if (schema[tableName][key].hasOwnProperty('references')) {
        column.references(schema[tableName][key].references);
      }
      if (schema[tableName][key].hasOwnProperty('defaultTo')) {
        column.defaultTo(schema[tableName][key].defaultTo);
      }
    });
  });
}
function createTables () {
  var tables = [];
  var tableNames = _.keys(schema);
  tables = _.map(tableNames, function (tableName) {
    return function () {
      return createTable(tableName);
    };
  });
  return sequence(tables);
}
createTables()
.then(function() {
  console.log('Tables created!!');
  process.exit(0);
})
.catch(function (error) {
  throw error;
});