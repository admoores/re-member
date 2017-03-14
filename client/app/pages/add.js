console.log('loaded add.js');

angular.module('remember.add', [])

.controller('AddController', function ($scope, Add) {
  $scope.newResource = {
    title: '',
    link: '',
    category: '',
    description: ''
  }
  $scope.isValidInput = false;
  $scope.errorMessage = '';

  $scope.validate = function() {
    $scope.errorMessage = '';
    if ($scope.newResource.title === '') {
      $scope.errorMessage += 'Title cannot be blank!\n';
    }
    if ($scope.newResource.link === '') {
      $scope.errorMessage += 'Link cannot be blank!\n';
    }
    if ($scope.newResource.description === '') {
      $scope.errorMessage += 'Description cannot be blank!\n';
    }
    if ($scope.newResource.category === '') {
      $scope.errorMessage += 'Category cannot be blank!\n';
    }
    if ($scope.errorMessage !== '') {
      $scope.isValidInput = false;
    } else {
      $scope.isValidInput = true;
    }
  }

  $scope.addResource = function() {
    Add.addNew($scope.newResource);
  }

});