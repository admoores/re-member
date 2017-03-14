console.log('loaded app.js');


angular.module('remember', [
  'remember.services',
  'remember.resources',
  'remember.add',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/resources', {
      templateUrl: 'app/pages/resources.html',
      controller: 'ResourceController'
    })
    .when('/add', {
      templateUrl: 'app/pages/add.html',
      controller: 'AddController'
    })
    .otherwise({
      redirectTo: '/resources'
    });
});