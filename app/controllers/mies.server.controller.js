'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	My = mongoose.model('My'),
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
				message = 'My already exists';
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
 * Create a My
 */
exports.create = function(req, res) {
	var my = new My(req.body);
	my.user = req.user;

	my.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(my);
		}
	});
};

/**
 * Show the current My
 */
exports.read = function(req, res) {
	res.jsonp(req.my);
};

/**
 * Update a My
 */
exports.update = function(req, res) {
	var my = req.my ;

	my = _.extend(my , req.body);

	my.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(my);
		}
	});
};

/**
 * Delete an My
 */
exports.delete = function(req, res) {
	var my = req.my ;

	my.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(my);
		}
	});
};

/**
 * List of Mies
 */
exports.list = function(req, res) { My.find().sort('-created').populate('user', 'displayName').exec(function(err, mies) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(mies);
		}
	});
};

/**
 * My middleware
 */
exports.myByID = function(req, res, next, id) { My.findById(id).populate('user', 'displayName').exec(function(err, my) {
		if (err) return next(err);
		if (! my) return next(new Error('Failed to load My ' + id));
		req.my = my ;
		next();
	});
};

/**
 * My authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.my.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};