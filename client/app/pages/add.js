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
    Add.addNew($scope.newResource);
    $scope.newResource = {
      title: '',
      link: '',
      category: '',
      description: ''
    }
  };

  $scope.addDummyResources = function() {
    var veritasium = {
      title: 'Veritasium: Gravitational Waves',
      category: 'science',
      link: 'https://www.youtube.com/watch?v=iphcyNWFD10',
      description: 'Awesome video about Gravitational Waves and how they were detected'
    };
    var computerphile = {
      title: 'Computerphile: Stop Button Problem',
      category: 'science',
      link: 'https://www.youtube.com/watch?v=3TYT1QfdfsM',
      description: 'Video about developing AI with an off switch. The idea is that it\'s still unknown how to best make an AI want to improve, but also not resist being reset'
    };
    var elk = {
      title: 'Ambidextrous Elk',
      category: 'science',
      link: 'http://edmontonjournal.com/news/local-news/ambidextrous-elk-linked-to-bolder-personalities-less-migration-u-of-a-study',
      description: 'Article about how elk without a preference for right or left hoof exhibit vastly different personality traits'
    };
    var nodehttp = {
      title: 'Anatomy of an HTTP request',
      category: 'javascript',
      link: 'https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/',
      description: 'Walkthrough/tutorial of the properties and behaviour of an http request in node'
    };
    var promises = {
      title: 'Promises Introduction',
      category: 'javascript',
      link: 'https://developers.google.com/web/fundamentals/getting-started/primers/promises',
      description: 'Introduction and tutorial on Promises in JS'
    };
    var radSong = {
      title: 'LUMBERJVCK ft. Kat Nestel - LITM (VNDL Remix)',
      category: 'music',
      link: 'https://www.youtube.com/watch?v=HAqXsO41E84',
      description: 'Future bass track with great vocals'
    }

    Add.addNew(veritasium).then(function() {
      Add.addNew(computerphile);
      Add.addNew(elk);
    });
    Add.addNew(nodehttp).then(function() {
      Add.addNew(promises);
    });
    Add.addNew(radSong);


  };

  $scope.validate();
});