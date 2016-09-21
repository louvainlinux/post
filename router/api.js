module.exports = function(router){
	router.route('/test')
	.get(function (req, res) {
    	console.log(req);
    	console.log("get /api/test");
    });
};