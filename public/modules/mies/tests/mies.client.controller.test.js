'use strict';

(function() {
	// Mies Controller Spec
	describe('Mies Controller Tests', function() {
		// Initialize global variables
		var MiesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Mies controller.
			MiesController = $controller('MiesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one My object fetched from XHR', inject(function(Mies) {
			// Create sample My using the Mies service
			var sampleMy = new Mies({
				name: 'New My'
			});

			// Create a sample Mies array that includes the new My
			var sampleMies = [sampleMy];

			// Set GET response
			$httpBackend.expectGET('mies').respond(sampleMies);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.mies).toEqualData(sampleMies);
		}));

		it('$scope.findOne() should create an array with one My object fetched from XHR using a myId URL parameter', inject(function(Mies) {
			// Define a sample My object
			var sampleMy = new Mies({
				name: 'New My'
			});

			// Set the URL parameter
			$stateParams.myId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/mies\/([0-9a-fA-F]{24})$/).respond(sampleMy);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.my).toEqualData(sampleMy);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Mies) {
			// Create a sample My object
			var sampleMyPostData = new Mies({
				name: 'New My'
			});

			// Create a sample My response
			var sampleMyResponse = new Mies({
				_id: '525cf20451979dea2c000001',
				name: 'New My'
			});

			// Fixture mock form input values
			scope.name = 'New My';

			// Set POST response
			$httpBackend.expectPOST('mies', sampleMyPostData).respond(sampleMyResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the My was created
			expect($location.path()).toBe('/mies/' + sampleMyResponse._id);
		}));

		it('$scope.update() should update a valid My', inject(function(Mies) {
			// Define a sample My put data
			var sampleMyPutData = new Mies({
				_id: '525cf20451979dea2c000001',
				name: 'New My'
			});

			// Mock My in scope
			scope.my = sampleMyPutData;

			// Set PUT response
			$httpBackend.expectPUT(/mies\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/mies/' + sampleMyPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid myId and remove the My from the scope', inject(function(Mies) {
			// Create new My object
			var sampleMy = new Mies({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Mies array and include the My
			scope.mies = [sampleMy];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/mies\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMy);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.mies.length).toBe(0);
		}));
	});
}());