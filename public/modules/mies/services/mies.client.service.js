'use strict';

//Mies service used to communicate Mies REST endpoints
angular.module('mies').factory('Mies', ['$resource',
	function($resource) {
		return $resource('mies/:myId', { myId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);