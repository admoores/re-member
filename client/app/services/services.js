console.log('loaded services.js');


angular.module('remember.services', [])

.factory('Resources', function($http) {
  var getAll = function() {
    return $http({
      method: 'GET',
      url: '192.168.1.113:80/api/resources'
    }).then(function(res) {
      return res.data;
    })
  }
})

.factory('Add', function($http) {
  return function() {return 'this is the add response'};
});