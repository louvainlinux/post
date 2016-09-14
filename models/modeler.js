var knex = require('../config/database').knex;
var bookshelf = require('bookshelf')(knex);

//Models

var Package = bookshelf.Model.extend({
    tableName: 'packages',
    tags: function() {
        return this.belongsToMany(Tag);
    },
    categories: function(){
        return this.belongsToMany(Category)
    },
    installs: function(){
        return this.hasMany(Install, 'package_id');
    }
});

var Category = bookshelf.Model.extend({
    tableName: 'categories',
    packages: function(){
        return this.belongsToMany(Package);
    }
});

var Tag = bookshelf.Model.extend({
    tableName: 'tags',
    packages: function() {
        return this.belongsToMany(Package);
    }
});

var Install = bookshelf.Model.extend({
    tableName: 'installs',
    target: function(){
        return this.belongsTo(Package, 'package_id');
    },
    alternates: function(){
        return this.hasMany(Alternate, 'install_id');
    }
});

var Alternate = bookshelf.Model.extend({
    tableName: 'alternates',
    target: function(){
        return this.belongsTo(Install, 'install_id');
    }
});

// Collections

var Packages = bookshelf.Collection.extend({
    model: Package
});
var Categories = bookshelf.Collection.extend({
    model: Category
});
var Tags = bookshelf.Collection.extend({
    model: Tag
});
var Installs = bookshelf.Collection.extend({
    model: Install
});
var Alternates = bookshelf.Collection.extend({
    model: Alternate
});

module.exports.knex = knex;
module.exports.bookshelf = bookshelf;

module.exports.Package = Package;
module.exports.Category = Category;
module.exports.Tag = Tag;
module.exports.Install = Install;
module.exports.Alternate = Alternate;

module.exports.Packages = Packages;
module.exports.Categories = Categories;
module.exports.Tags = Tags;
module.exports.Installs = Installs;
module.exports.Alternates = Alternates;