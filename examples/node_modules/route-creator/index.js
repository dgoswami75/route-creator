
var createRoutes = function (server) {
	var fs = require('fs');
	var path = require('path');
	var appDir = path.dirname(require.main.filename);
	//console.log('Verify application root directory: ' + appDir);

	fs.readdirSync(appDir).forEach(function(file) {

		if (file == 'app_modules') {
			fs.readdirSync(appDir + "/" + file).forEach(function(moduleFile) {
				var stats = fs.statSync(appDir + "/" + file + "/" + moduleFile);

				if (stats.isDirectory()) {
					fs.readdirSync(appDir + "/app_modules/" + moduleFile).forEach(function(moduleComponent) {
						if (moduleComponent == 'controllers') {

							fs.readdirSync(appDir + "/app_modules/" + moduleFile + "/controllers").forEach(function(controller) {
								controller = controller.substring(0, controller.indexOf('.js'));
								var route = moduleFile + '/' + controller;
								var controllerModule = require(appDir + '/app_modules/'+moduleFile+'/controllers/'+controller);

								if(controllerModule.main){
									if(controllerModule.args) {
										route += "/:" + controllerModule.args;
									}
									console.log('adding route - ' + route);
									server.get(route, controllerModule.main);
									server.post(route, controllerModule.main);
								}
							});
						}
					});
				}
			});
		}
	});

	return server;
};

module.exports = {
	createRoutes: createRoutes
};