'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * My Schema
 */
var MySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill My name',
		trim: true
	},
    partners: {
      type: String,
        default: '',
        trim: true
    },
    type: {
        type: String,
        default: '',
        trim: true
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

mongoose.model('My', MySchema);