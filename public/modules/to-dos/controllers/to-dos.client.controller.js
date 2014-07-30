'use strict';

// To dos controller
angular.module('to-dos').controller('ToDosController', ['$scope', '$stateParams', '$location', 'Authentication', 'ToDos',
	function($scope, $stateParams, $location, Authentication, ToDos ) {
		$scope.authentication = Authentication;

		// Create new To do
		$scope.create = function() {
			// Create new To do object
			var toDo = new ToDos ({
				name: this.name,
                description: this.description,
                status :this.status
			});

			// Redirect after save
			toDo.$save(function(response) {
				$location.path('to-dos/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
            this.description = '';
            this.status = '';
		};

		// Remove existing To do
		$scope.remove = function( toDo ) {
			if ( toDo ) { toDo.$remove();

				for (var i in $scope.toDos ) {
					if ($scope.toDos [i] === toDo ) {
						$scope.toDos.splice(i, 1);
					}
				}
			} else {
				$scope.toDo.$remove(function() {
					$location.path('to-dos');
				});
			}
		};

		// Update existing To do
		$scope.update = function() {
			var toDo = $scope.toDo ;

			toDo.$update(function() {
				$location.path('to-dos/' + toDo._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of To dos
		$scope.find = function() {
			$scope.toDos = ToDos.query();
		};

		// Find existing To do
		$scope.findOne = function() {
			$scope.toDo = ToDos.get({ 
				toDoId: $stateParams.toDoId
			});
		};

        $scope.remaining = function() {
            var count = 0;
            angular.forEach($scope.toDos, function(toDo) {
                count += toDo.status == 'Open'   ? 1 : 0;
            });
            return count;
        };
	}
]);