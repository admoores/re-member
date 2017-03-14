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

  var testUserAuth = function(user) {
    return $http({
      method: 'POST',
      url: '/api/auth',
      data: {user: user}
    })
  };

  return {
    getAll: getAll,
    testUserAuth: testUserAuth
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
});