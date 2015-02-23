var restify = require('restify');
var server = restify.createServer();


/*
 * Modules are automatically loaded once they are declared
 * in the controller directory.
 */

var routeCreator = require('route-creator');
routeCreator.createRoutes(server);

/*
 * Can setup any routes in the framework's 'native' way too
 */
server.get('/getACL', function(req, res) {
	console.log('/getACL invoked');
	res.json({success: '/getACL invoked'});
});

server.listen(4000, function() {
	console.log("Server started @ ", 4000);
});

module.exports = server;