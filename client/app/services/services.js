console.log('loaded services.js');


angular.module('remember.services', [])

.factory('Resources', function($http) {
  var getAll = function() {
    return $http({
      method: 'GET',
      url: '/api/resources'
    }).then(function(res) {
      return res.data;
    })
  };

  return {
    getAll: getAll
  };
})

.factory('Add', function($http) {
  var addNew = function(resource) {
    $http({
      method: 'POST',
      url: '/api/resources',
      data: resource
    });
  }

  return {
    addNew: addNew
  };
})

.factory('Auth', function($http) {
  var attemptAuth = function(user) {
    $http({
      method: 'POST',
      url: '/api/auth',
      data: {user: user}
    }).then(function(res) {
      return res.data.token;
    });
  }

  return {
    attemptAuth: attemptAuth
  };

});