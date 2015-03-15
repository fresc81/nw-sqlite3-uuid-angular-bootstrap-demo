
// sqlite module
var sqlite3 = require('sqlite3').verbose();
var uuid = require('node-uuid');

// angular controller
angular.module('sqliteApp', [])
. controller('SQLiteController', ['$scope', function($scope) {
    
    // prepared statements
    var stmtAdd = null;
    var stmtDelete = null;
    var stmtRetrieve = null;
    
    // open database...
    var db = new sqlite3.Database('data.db', function() {
      
      // prepare table...
      db.run('CREATE TABLE IF NOT EXISTS items (uuid TEXT PRIMARY KEY NOT NULL UNIQUE, name TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE)'/*+' WITHOUT ROWID'*/, function() {
        
        // prepare statements...
        stmtAdd = db.prepare('INSERT INTO items VALUES (?,?,?)');
        stmtDelete = db.prepare('DELETE FROM items WHERE uuid = ?');
        stmtRetrieve = db.prepare('SELECT uuid, name, email FROM items');
        
        // database is ready
        $scope.ready = true;
        
        // update view
        $scope.update();
      });
      
    });
    
    /* scope variables */
    $scope.items = [];
    $scope.name = '';
    $scope.email = '';
    $scope.ready = false;
    
    /* add item to database */
    $scope.add = function () {
      
      // get field values
      var name = $scope.name;
      var email = $scope.email;
      $scope.name = '';
      $scope.email = '';
      
      // generate 128bit UUID
      var id = uuid.v1();
      
      // call 'add' statement...
      stmtAdd.run(id, name, email, function (err) {
        if (!err) {
          // update view
          $scope.update();
        } else {
          console.log(err);

          // synch model
          $scope.$apply();
        }
      });
      
    };
    
    /* delete item from database */
    $scope.delete = function (uuid) {
      
      // call 'delete' statement...
      stmtDelete.run(uuid, function (err) {
        if (!err) {
          // update view
          $scope.update();
        } else {
          console.log(err);

          // synch model
          $scope.$apply();
        }
      });
      
    };
    
    /* retrieve items from database */
    $scope.update = function () {
      
      // clear items list
      $scope.items = [];
      
      // call 'retrieve' statement...
      stmtRetrieve.each(function(err, row) {
        if (!err)
          $scope.items.push({uuid: row.uuid, name:row.name, email:row.email});
        else
          console.log(err);
      }, function (err) {
        if (!!err)
          console.log(err);
        
        // synch model
        $scope.$apply();
      });
      
    };
    
  }]);

