console.log('loaded auth.js');

angular.module('remember.auth', [])

.controller('AuthController', function ($scope, Auth, $location, $window) {
  $scope.user = {
    name: '',
    password: ''
  };

  $scope.errorMessage = '';
  $scope.isValid = false;

  $scope.attemptAuth = function() {
    Auth.attemptAuth($scope.user)
    .then(function(token) {
      $window.localStorage.setItem('com.remember', token);
      $location.path('/resources');
    });
  }

  $scope.validate = function() {
    $scope.errorMessage = '';
    if ($scope.user.name === '' || $scope.user.password === '') {
      $scope.errorMessage = 'Fields cannot be blank!'
      $scope.isValid = false;
    } else {
      $scope.isValid =  true;
    }
  };


  $scope.validate();
});