'use strict';

// Configuring the Articles module
angular.module('mies').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'My EveNet', 'mies', 'dropdown', '/mies(/create)?');
		Menus.addSubMenuItem('topbar', 'mies', 'EveNets List', 'mies');
		Menus.addSubMenuItem('topbar', 'mies', 'New EveNet', 'mies/create');
	}
]);