console.log('loaded app.js');


angular.module('remember', [
  'remember.services',
  'remember.resources',
  'remember.add',
  'remember.auth',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
  .when('/resources', {
    templateUrl: 'app/pages/resources.html',
    controller: 'ResourceController',
    auth: true
  })
  .when('/add', {
    templateUrl: 'app/pages/add.html',
    controller: 'AddController',
    auth: true
  })
  .when('/auth', {
    templateUrl: 'app/pages/auth.html',
    controller: 'AuthController'
  })
  .otherwise({
    redirectTo: '/resources'
  });


  $httpProvider.interceptors.push('Token');
})
.factory('Token', function($window) {
  var attach = {
    request: function (object) {
      var token = $window.localStorage.getItem('com.remember');
      if (token) {
        object.headers['x-access-token'] = token;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function($rootScope, $locaiton, $window) {
  $rootScope.on('$routeChangeStart', function(evt, next, current) {
    var hasToken = !!$window.localStorage.getItem('com.remember');
    if (!hasToken && next.$$route && next.$$route.auth) {
      $location.path('/auth')
    }
  });
});