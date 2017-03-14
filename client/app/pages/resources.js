console.log('loaded resources.js');

angular.module('remember.resources', [])

.controller('ResourceController', function ($scope, Resources) {
  $scope.data = {};
  $scope.searchField = '';
  $scope.filter = {};


  $scope.findCategoryById = function(id) {
    for (var item of $scope.data.categories) {
      if (item.id === id) {
        return item.name;
      }
    }
  }

  $scope.updateFilter = function() {
    console.log($scope.filter);
  }

  $scope.hasResources = function() {
    return $scope.data.resources.length !== 0;
  }

  $scope.initFilter = function() {
    for (var item of $scope.data.categories) {
      $scope.filter[item] = true;
    }
  }

  Resources.getAll().then(function(resources) {
    $scope.data = resources;
    $scope.initFilter();
  });
});
