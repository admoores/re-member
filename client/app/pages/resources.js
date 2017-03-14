console.log('loaded resources.js');

angular.module('remember.resources', [])

.controller('ResourceController', function ($scope, Resources) {
  $scope.data = {};
  Resources.getAll().then(function(resources) {
    $scope.data = resources;
  });
});
