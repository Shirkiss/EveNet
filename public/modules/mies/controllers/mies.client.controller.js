'use strict';

// Mies controller
angular.module('mies').controller('MiesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Mies', '$http',
	function($scope, $stateParams, $location, Authentication, Mies, $http ) {
		$scope.authentication = Authentication;
        $http.get('modules/mies/data.json').success(function(friends_list){
            $scope.friends = friends_list;
        });

		// Create new My
		$scope.create = function() {
			// Create new My object
			var my = new Mies ({
				name: this.name,
                partners: this.partners,
                type: this.type
			});

			// Redirect after save
			my.$save(function(response) {
				$location.path('mies/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
            this.partners = '';
            this.type = '';
		};

		// Remove existing My
		$scope.remove = function( my ) {
			if ( my ) { my.$remove();

				for (var i in $scope.mies ) {
					if ($scope.mies [i] === my ) {
						$scope.mies.splice(i, 1);
					}
				}
			} else {
				$scope.my.$remove(function() {
					$location.path('mies');
				});
			}
		};

		// Update existing My
		$scope.update = function() {
			var my = $scope.my ;

			my.$update(function() {
				$location.path('mies/' + my._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Mies
		$scope.find = function() {
			$scope.mies = Mies.query();
		};

		// Find existing My
		$scope.findOne = function() {
			$scope.my = Mies.get({ 
				myId: $stateParams.myId
			});
		};
	}
]);