'use strict';

(function() {
	// To dos Controller Spec
	describe('To dos Controller Tests', function() {
		// Initialize global variables
		var ToDosController,
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

			// Initialize the To dos controller.
			ToDosController = $controller('ToDosController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one To do object fetched from XHR', inject(function(ToDos) {
			// Create sample To do using the To dos service
			var sampleToDo = new ToDos({
				name: 'New To do'
			});

			// Create a sample To dos array that includes the new To do
			var sampleToDos = [sampleToDo];

			// Set GET response
			$httpBackend.expectGET('to-dos').respond(sampleToDos);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.toDos).toEqualData(sampleToDos);
		}));

		it('$scope.findOne() should create an array with one To do object fetched from XHR using a toDoId URL parameter', inject(function(ToDos) {
			// Define a sample To do object
			var sampleToDo = new ToDos({
				name: 'New To do'
			});

			// Set the URL parameter
			$stateParams.toDoId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/to-dos\/([0-9a-fA-F]{24})$/).respond(sampleToDo);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.toDo).toEqualData(sampleToDo);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(ToDos) {
			// Create a sample To do object
			var sampleToDoPostData = new ToDos({
				name: 'New To do'
			});

			// Create a sample To do response
			var sampleToDoResponse = new ToDos({
				_id: '525cf20451979dea2c000001',
				name: 'New To do'
			});

			// Fixture mock form input values
			scope.name = 'New To do';

			// Set POST response
			$httpBackend.expectPOST('to-dos', sampleToDoPostData).respond(sampleToDoResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the To do was created
			expect($location.path()).toBe('/to-dos/' + sampleToDoResponse._id);
		}));

		it('$scope.update() should update a valid To do', inject(function(ToDos) {
			// Define a sample To do put data
			var sampleToDoPutData = new ToDos({
				_id: '525cf20451979dea2c000001',
				name: 'New To do'
			});

			// Mock To do in scope
			scope.toDo = sampleToDoPutData;

			// Set PUT response
			$httpBackend.expectPUT(/to-dos\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/to-dos/' + sampleToDoPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid toDoId and remove the To do from the scope', inject(function(ToDos) {
			// Create new To do object
			var sampleToDo = new ToDos({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new To dos array and include the To do
			scope.toDos = [sampleToDo];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/to-dos\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleToDo);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.toDos.length).toBe(0);
		}));
	});
}());