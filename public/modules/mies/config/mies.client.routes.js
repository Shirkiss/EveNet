'use strict';

//Setting up route
angular.module('mies').config(['$stateProvider',
	function($stateProvider) {
		// Mies state routing
		$stateProvider.
		state('listMies', {
			url: '/mies',
			templateUrl: 'modules/mies/views/list-mies.client.view.html'
		}).
		state('createMy', {
			url: '/mies/create',
			templateUrl: 'modules/mies/views/create-my.client.view.html'
		}).
		state('viewMy', {
			url: '/mies/:myId',
			templateUrl: 'modules/mies/views/view-my.client.view.html'
		}).
		state('editMy', {
			url: '/mies/:myId/edit',
			templateUrl: 'modules/mies/views/edit-my.client.view.html'
		});
	}
]);