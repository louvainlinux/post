bodyParser = require('body-parser');

module.exports.app = function(app, express) {
	
	api_routes = express.Router();
	require('./api.js')(api_routes);
	
	app.use('/api', api_routes);
};
