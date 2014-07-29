'use strict';

// Configuring the Articles module
angular.module('to-dos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'To Do List', 'to-dos', 'dropdown', '/to-dos(/create)?');
		Menus.addSubMenuItem('topbar', 'to-dos', 'My To-Do list', 'to-dos');
		Menus.addSubMenuItem('topbar', 'to-dos', 'Add new task', 'to-dos/create');
	}
]);