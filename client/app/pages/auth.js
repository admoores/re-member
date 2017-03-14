console.log('loaded auth.js');

angular.module('remember.auth', [])

.controller('AuthController', function ($scope, Auth) {
  $scope.user = {
    name: '',
    password: ''
  };

  $scope.errorMessage = '';

  $scope.attemptAuth = function() {
    Auth.attemptAuth($scope.user);
  }

  $scope.validate() = function() {
    $scope.errorMessage = '';
    if ($scope.user.name === '' || $scope.user.password) {
      $scope.errorMessage = 'Fields cannot be blank!'
      return false;
    }
    return true;
  }
});