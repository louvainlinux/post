var modeler = require('../models/modeler');

var fs = require('fs');
var _ = require('lodash');

//carefull. relative path for fs.readFileSync is based on the path of the process,
//	not the file. If .., then the script must be launched from the script folder

// TAG
var content_tag = fs.readFileSync('../temp/tag.json');
var json_tag = JSON.parse(content_tag);
json_tag.tag.forEach(function(tag){
	modeler.Tag.forge({
		name: tag	
	})
	.save()
	.then(function(t){
		console.log(t);
	});
	/*.otherwise(function(err){
		console.log("creation of " + tag + ". error: " + err.message);
	});*/
});

// CATEGORY
var content_cat = fs.readFileSync('../temp/category.json');
var json_cat = JSON.parse(content_cat);
json_cat.category.forEach(function(cat){
	modeler.Category.forge({
		name: cat	
	})
	.save()
	.then(function(c){
		console.log(c);
	});
});

// PACKAGE
function promiseTags(tags){
	var tagObjects = tags.map(function(tag){
		return {
			name: tag
		};
	});
	return Tags.forge()
		.query('whereIn', 'name', _.pluck(tagObjects, 'name'))
		.fetch()
		.then(function(existingTags){
			return _.pluck(existingTags, 'id');
		});
}

function promiseCategories(categories){
	var catObjects = categories.map(function(cat){
		return {
			name: cat
		};
	});
	return Categories.forge()
		.query('whereIn', 'name', _.pluck(catObjects, 'name'))
		.fetch()
		.then(function(existingCategories){
			return _.pluck(existingCategories, 'id');
		});
}

var content_package = fs.readFileSync("../temp/package.json");
var json_package = JSON.parse(content_package);
console.log(json_package);
json_package.forEach(function(pack){
    modeler.Package
    .forge(
        {
            name: pack.name,
            descriptionShort: pack.descriptionShort,
            descriptionLong: pack.descriptionLong,
            preSelected: pack.preSelected
        })
    .save()
    .then(function(package){
    	tags=pack.tag;
    	promiseTags(tags)
    	.then(function(ids){
    		package.load(['tags'])
    		.then(function(model){
    			model.tags().attach(ids);
    		});
    	});
    	categories=pack.category;
    	promiseCategories(categories)
    	.then(function(ids){
    		package.load(['Categories'])
    		.then(function(model){
    			model.categories().attach(ids);
    		});
    	});
    });
    console.log("done");
});