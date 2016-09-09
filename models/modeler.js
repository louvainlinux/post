var database = require('../config/database').database;

var Package = database.define('Package', {
    name: {type: 'STRING', allowNull: false, unique: true},
    descriptionShort: {type: 'STRING', allowNull: false, defaultValue: 'todo'},
    descriptionLong: {type: 'TEXT', allowNull: false, defaultValue: 'todo'},
    preSelected: {type: 'BOOLEAN', allowNull: false, defaultValue: false}
    });

var Category = database.define('Category', {
    name: {type: 'STRING', allowNull: false, unique: true}
    });

var Tag = database.define('Tag', {
    name: {type: 'STRING', allowNull: false, unique: true}
    });

var PrimaryInstall = database.define('PrimaryInstall', {
    name: {type: 'STRING', allowNull: false, unique: "compositeNameVersion"},
    description: {type: 'STRING', allowNull: false, defaultValue: 'todo'},
    version: {type: 'STRING', allowNull: false, unique: "compositeNameVersion"},
    installPre: {type: 'STRING', allowNull: true},
    installCustom: {type: 'STRING', allowNull: false},
    installPost: {type: 'STRING', allowNull: true}
    });

var AlternateInstall = database.define('AlternateInstall', {
    name: {type: 'STRING', allowNull: false},
    description: {type: 'STRING', allowNull: false, defaultValue: 'todo'},
    installPre: {type: 'STRING', allowNull: true},
    installCustom: {type: 'STRING', allowNull: false},
    installPost: {type: 'STRING', allowNull: true}
    });

Package.belongsToMany(Category, {through: 'PackageCategory'});
Category.belongsToMany(Package, {through: 'PackageCategory'});

Package.belongsToMany(Tag, {through: 'PackageTag'});
Tag.belongsToMany(Package, {through: 'PackageTag'});

Package.hasMany(PrimaryInstall, {as: 'PrimaryInstall'});
PrimaryInstall.hasMany(AlternateInstall, {as: 'AlternateInstall'});

module.exports.Package = Package;
module.exports.Category = Category;
module.exports.Tag = Tag;
module.exports.PrimaryInstall = PrimaryInstall;
module.exports.AlternateInstall = AlternateInstall;