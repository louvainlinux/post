var express = require('express');
var app = express();
var port =  3001;
var database = require('./config/database');
require('./api/routes.js')(app);
app.use(function (error, request, response, next) {
 console.error(error.stack);
 response.status(400).send(error.message);
});
app.listen(port, function() {
 console.log("Node app is running at localhost:" + port);
});
