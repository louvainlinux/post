module.exports = function(router){
    
    // get all categories
    router.route('/')
    .get(function(req, res){
        res.send('categories called');
        console.log('categories called');
    });

    // get the id of the category with name :name
    router.route('/name/:name')
    .get(function(req, res){
        // have to check on typ
        res.send('categories called with name: ' + req.params.name);
        console.log('categories name called with: ' + req.params.name);
    });

    // get the name of the category with id :id
    router.route('/:id')
    .get(function(req, res){
        res.send('categories called with id: ' + req.params.id);
        console.log('categories id called with: ' + req.params.id);
    });

};