angular.module('remember.add', [])

.controller('AddController', function ($scope, Add) {
  $scope.test = 'this is some test info'
  $scope.test2 = Add();
});