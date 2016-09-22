module.exports = function(router){
	/*router.route('/test')
	.get(function (req, res) {
    	console.log(req);
    	console.log("get /api/test");
    });*/
    router.route('/')
    .get(function(req, res){
    	res.send("packages called");
    	console.log("packages called");
    });

    router.route('/:id')
    .get(function(req, res){
    	res.send("packages called with id: " + req.params.id);
    	console.log('packages id called with: ' + req.params.id);
    });

    router.route('/tags/:id')
    .get(function(req, res){

    });

    router.route('/tags/name/:name')
    .get(function(req, res){

    });

    router.route('/categories/:id')
    .get(function(req, res){

    });    

    router.route('/categories/name/:name')
    .get(function(req, res){

    });

    router.route('/tags/:id/categories/:id')
    .get(function(req, res){

    });

    router.route('/tags/:id/categories/name/:name')
    .get(function(req, res){

    });

    router.route('/tags/name/:name/categories/:id')
    .get(function(req, res){

    });

    router.route('/tags/name/:name/categories/name/:name')
    .get(function(req, res){

    });

    router.route('/:id/installs')
    .get(function(req, res){

    });

    router.route('/:id/installs/:version')
    .get(function(req, res){

    });

    router.route('/:id/installs/:version/alternates')
    .get(function(req, res){

    });

    router.route('/:id/installs/:version/alternates/:id')
    .get(function(req, res){

    });    

};