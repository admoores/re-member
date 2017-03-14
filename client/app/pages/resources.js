console.log('loaded resources.js');

angular.module('remember.resources', [])

.controller('ResourceController', function ($scope, Resources) {
  $scope.test = 'this is some test info'
  $scope.test2 = Resources();
});
