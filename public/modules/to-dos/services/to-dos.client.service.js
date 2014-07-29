'use strict';

//To dos service used to communicate To dos REST endpoints
angular.module('to-dos').factory('ToDos', ['$resource',
	function($resource) {
		return $resource('to-dos/:toDoId', { toDoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);