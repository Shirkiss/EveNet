'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var mies = require('../../app/controllers/mies');

	// Mies Routes
	app.route('/mies')
		.get(mies.list)
		.post(users.requiresLogin, mies.create);

	app.route('/mies/:myId')
		.get(mies.read)
		.put(users.requiresLogin, mies.hasAuthorization, mies.update)
		.delete(users.requiresLogin, mies.hasAuthorization, mies.delete);

	// Finish by binding the My middleware
	app.param('myId', mies.myByID);
};