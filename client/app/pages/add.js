console.log('loaded add.js');

angular.module('remember.add', [])

.controller('AddController', function ($scope, Add) {
  var testObj = {title: 'This is a new page', link: 'this is a link', description: 'this is a description', category: 'this is a category'};
  Add.addNew(testObj);
});