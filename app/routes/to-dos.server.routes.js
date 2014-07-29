'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var toDos = require('../../app/controllers/to-dos');

	// To dos Routes
	app.route('/to-dos')
		.get(toDos.list)
		.post(users.requiresLogin, toDos.create);

	app.route('/to-dos/:toDoId')
		.get(toDos.read)
		.put(users.requiresLogin, toDos.hasAuthorization, toDos.update)
		.delete(users.requiresLogin, toDos.hasAuthorization, toDos.delete);

	// Finish by binding the To do middleware
	app.param('toDoId', toDos.toDoByID);
};