angular.module('remember.services', [])

.factory('Resources', function($http) {
  return function() {return 'this is the resources response'};
})

.factory('Add', function($http) {
  return function() {return 'this is the add response'};
});