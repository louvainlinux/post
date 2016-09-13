var database = require('../config/database').database;
var Sequelize = require('../config/database').Sequelize;

var Package = database.define('Package', {
    name: {type: Sequelize.STRING, allowNull: false, unique: true},
    descriptionShort: {type: Sequelize.STRING, allowNull: false},
    descriptionLong: {type: Sequelize.TEXT, allowNull: false},
    preSelected: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false}
    });

var Category = database.define('Category', {
    name: {type: Sequelize.STRING, allowNull: false, unique: true}
    });

var Tag = database.define('Tag', {
    name: {type: Sequelize.STRING, allowNull: false, unique: true}
    });

var PrimaryInstall = database.define('PrimaryInstall', {
    name: {type: Sequelize.STRING, allowNull: false, unique: "compositeNameVersion"},
    //description: {type: Sequelize.STRING, allowNull: false, defaultValue: 'todo'},
    version: {type: Sequelize.STRING, allowNull: false, unique: "compositeNameVersion"},
    installPre: {type: Sequelize.STRING, allowNull: true},
    installCustom: {type: Sequelize.STRING, allowNull: false},
    installPost: {type: Sequelize.STRING, allowNull: true}
    });

var AlternateInstall = database.define('AlternateInstall', {
    name: {type: Sequelize.STRING, allowNull: false},
    description: {type: Sequelize.STRING, allowNull: false, defaultValue: 'todo'},
    installPre: {type: Sequelize.STRING, allowNull: true},
    installCustom: {type: Sequelize.STRING, allowNull: false},
    installPost: {type: Sequelize.STRING, allowNull: true}
    });

/*
Package.belongsToMany(Category, {through: 'PackageCategory'});
Category.belongsToMany(Package, {through: 'PackageCategory'});


Package.belongsToMany(Tag, {through: 'PackageTag'});
Tag.belongsToMany(Package, {through: 'PackageTag'});
*/
Package.hasMany(Category, {joinTableName: 'PackageCategory'});
Category.hasMany(Package, {joinTableName: 'PackageCategory'});

Package.hasMany(Tag, {joinTableName: 'PackageTag'});
Tag.hasMany(Package, {joinTableName: 'PackageTag'});

Package.hasMany(PrimaryInstall, {as: 'PrimaryInstall'});
PrimaryInstall.hasMany(AlternateInstall, {as: 'AlternateInstall'});


var fs = require("fs");
database.sync({force:true})
    .then(function(){
        var content_tag = fs.readFileSync("./temp/tag.json");
        var json_tag = JSON.parse(content_tag);
        json_tag.tag.forEach(function(tag){
            Tag.create({name: tag});
        });
    })
    .then(function(){
        var content_cat = fs.readFileSync("./temp/category.json");
        var json_cat = JSON.parse(content_cat);
        json_cat.category.forEach(function(cat){
            Category.create({name: cat});
        });  
    })
    .then(function(){
        var content_package = fs.readFileSync("./temp/package.json");
        var json_package = JSON.parse(content_package);
        console.log(json_package);
        json_package.forEach(function(pack){
            Package.create(
                {
                    name: pack.name,
                    descriptionShort: pack.descriptionShort,
                    descriptionLong: pack.descriptionLong,
                    preSelected: pack.preSelected,
                    Category: pack.category,
                    Tag: pack.tag
                }, {
                    include: [ Category, Tag]                    
                }
                );
        });
    })
    .then(function(){/*p_inst*/console.log("3")})
    .then(function(){/*a_inst*/console.log("4")});




module.exports.Package = Package;
module.exports.Category = Category;
module.exports.Tag = Tag;
module.exports.PrimaryInstall = PrimaryInstall;
module.exports.AlternateInstall = AlternateInstall;
module.exports.database = database;