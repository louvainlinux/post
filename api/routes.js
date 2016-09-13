var Project = require('../models/modeler');
bodyParser = require('body-parser');
module.exports = function(app) {
 app.use(bodyParser.json());
 app.get('/api/projects', function(request, response) {
   console.log("/route called");
   //Project.findAll({ where: { show: ‘TRUE’ }})
   //.then(function(projects) {
     //response.json(projects);
   //})
  });
};
