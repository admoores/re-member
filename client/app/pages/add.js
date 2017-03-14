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
  $scope.errorMessages = [];

  $scope.validate = function() {
    $scope.errorMessages = [];
    if ($scope.newResource.title === '') {
      $scope.errorMessages.push('Title cannot be blank!');
    }
    if ($scope.newResource.link === '') {
      $scope.errorMessages.push('Link cannot be blank!');
    }
    if ($scope.newResource.description === '') {
      $scope.errorMessages.push('Description cannot be blank!');
    }
    if ($scope.newResource.category === '') {
      $scope.errorMessages.push('Category cannot be blank!');
    }
    if ($scope.errorMessages.length !== 0) {
      $scope.isValidInput = false;
    } else {
      $scope.isValidInput = true;
    }
  }

  $scope.addResource = function() {
    console.log('Submitted!!!');
    Add.addNew($scope.newResource);
  }

});