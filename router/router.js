bodyParser = require('body-parser');

module.exports.app = function(app, express) {
	
	api_packages_routes = express.Router();
	require('./api/packages.js')(api_packages_routes);
	
	api_tags_routes = express.Router();
	require('./api/tags.js')(api_tags_routes);

	api_categories_routes = express.Router();
	require('./api/categories.js')(api_categories_routes);

	app.use('/api/packages', api_packages_routes);
	app.use('/api/tags', api_tags_routes);
	app.use('/api/categories', api_categories_routes);
};
