angular.module('remember.resources', [])

.controller('ResourcesController', function ($scope, Resources) {
  $scope.test = 'this is some test info'
  $scope.test2 = Resources();
});