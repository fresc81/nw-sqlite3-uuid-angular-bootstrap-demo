
var gui = require('nw.gui');
var pack = require('./package.json');

// the app window
var win = gui.Window.open('main.html', {
  title: 'node-webkit node-sqlite3 node-uuid angular bootstrap demo',
  icon: 'img/icon.png',
  toolbar: true,
  frame: true,
  width: 800,
  height: 700,
  show: false,
  position: 'center',
  min_width: 400,
  min_height: 200
});

// angular controller
angular.module('splashApp', [])
. controller('SplashController', ['$scope', function($scope) {
    
    // get app version
    $scope.version = pack.version;
    
    // get app authors and contributors
    $scope.authors = [];
    $scope.authors.push(pack.author);
    if (!!pack.contributors)
      for (var i = 0; i < pack.contributors.length; i++)
        $scope.authors.push(pack.contributors[i]);
    
    // close after 3 seconds
    setTimeout(function () {
      
      window.close();
      win.show();
      win.focus();
      
    }, 3000);
    
  }]);
