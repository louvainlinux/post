module.exports = function(router){
	
    // get all tags
    router.route('/')
    .get(function(req, res){
    	res.send('tags called');
    	console.log('tags called');
    });

    // get the id of the tag with name :name
    router.route('/name/:name')
    .get(function(req, res){
    	res.send('tags called with name: ' + req.params.name);
    	console.log('tags name called with: ' + req.params.name);
    });

    // get the name of the tag with id :id
    router.route('/:id')
    .get(function(req, res){
        res.send('tags called with id: ' + req.params.id);
        console.log('tags id called with: ' + req.params.id);
    });

};