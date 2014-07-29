'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	ToDo = mongoose.model('ToDo'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'To do already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a To do
 */
exports.create = function(req, res) {
	var toDo = new ToDo(req.body);
	toDo.user = req.user;

	toDo.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(toDo);
		}
	});
};

/**
 * Show the current To do
 */
exports.read = function(req, res) {
	res.jsonp(req.toDo);
};

/**
 * Update a To do
 */
exports.update = function(req, res) {
	var toDo = req.toDo ;

	toDo = _.extend(toDo , req.body);

	toDo.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(toDo);
		}
	});
};

/**
 * Delete an To do
 */
exports.delete = function(req, res) {
	var toDo = req.toDo ;

	toDo.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(toDo);
		}
	});
};

/**
 * List of To dos
 */
exports.list = function(req, res) { ToDo.find().sort('-created').populate('user', 'displayName').exec(function(err, toDos) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(toDos);
		}
	});
};

/**
 * To do middleware
 */
exports.toDoByID = function(req, res, next, id) { ToDo.findById(id).populate('user', 'displayName').exec(function(err, toDo) {
		if (err) return next(err);
		if (! toDo) return next(new Error('Failed to load To do ' + id));
		req.toDo = toDo ;
		next();
	});
};

/**
 * To do authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.toDo.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};