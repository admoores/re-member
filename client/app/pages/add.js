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
  };

  $scope.addResource = function() {
    console.log('Submitted!!!');
    Add.addNew($scope.newResource);
    $scope.newResource = {
      title: '',
      link: '',
      category: '',
      description: ''
    }
  };

  $scope.addDummyResources = function() {
    var userobj = {name: 'admin'};
    var obj1 = {title: 'Google', category: 'stuff', link: 'http://www.google.com', description: 'This page has stuff', user: userobj};
    var obj2 = {title: 'Facebook', category: 'otherstuff', link: 'http://www.facebook.com', description: 'This page has friends', user: userobj};
    var obj3 = {title: 'Youtube', category: 'funstuff', link: 'http://www.youtube.com', description: 'This page has videos', user: userobj};
    var obj4 = {title: 'Bing', category: 'uselessstuff', link: 'http://www.bing.com', description: 'This page has useless stuff', user: userobj};
    Add.addNew(obj1);
    Add.addNew(obj2);
    Add.addNew(obj3);
    Add.addNew(obj4);
  };

  $scope.validate();
});