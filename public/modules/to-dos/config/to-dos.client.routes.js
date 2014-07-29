'use strict';

//Setting up route
angular.module('to-dos').config(['$stateProvider',
	function($stateProvider) {
		// To dos state routing
		$stateProvider.
		state('listToDos', {
			url: '/to-dos',
			templateUrl: 'modules/to-dos/views/list-to-dos.client.view.html'
		}).
		state('createToDo', {
			url: '/to-dos/create',
			templateUrl: 'modules/to-dos/views/create-to-do.client.view.html'
		}).
		state('viewToDo', {
			url: '/to-dos/:toDoId',
			templateUrl: 'modules/to-dos/views/view-to-do.client.view.html'
		}).
		state('editToDo', {
			url: '/to-dos/:toDoId/edit',
			templateUrl: 'modules/to-dos/views/edit-to-do.client.view.html'
		});
	}
]);