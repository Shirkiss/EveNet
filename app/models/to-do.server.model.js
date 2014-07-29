'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * To do Schema
 */
var ToDoSchema = new Schema({
	name: {
		type: String,
		default: 'New task',
		required: 'Please fill To do name',
		trim: true
	},
    description:{
        type: String,
        defult: '',
        trip: true
    },
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('ToDo', ToDoSchema);