'use strict';

angular.module('5BeatsApp')
  .controller('ProfileCtrl', ['$scope', '$http', 'Users', 'Songs', function ($scope, $http, Users, Songs) {

      Users.getAllUsers().success(function(data){
          $scope.users = data.data;
          $scope.message = data.message;

          $scope.userid = data.data[0]._id;
          // Get user
          Users.getUser($scope.userid).success(function(data){
              $scope.selectedUser = data.data;
              $scope.message = data.message;
              console.log("*****"+ JSON.stringify($scope.selectedUser));

              // Get public uploads
              Songs.getUploads($scope.selectedUser._id, true).success(function(data){
                  $scope.publicUploads = data.data;
                  $scope.message = data.message;
                  console.log("*****"+ JSON.stringify($scope.publicUploads));
                console.log("MESSAGE"+ JSON.stringify($scope.message));
              })
              .error(function(data){
                  console.log(data);
              });
        })
        .error(function(data){
            console.log(data.message);
        });
      });

    $scope.dummyUsers = [
        {"username":"John", "email":"John@gmail.com"},
        {"username":"Anna", "email":"Anna@gmail.com"},
        {"username":"Peter","email":"Peter@gmail.com"}
    ];

    $scope.dummyPublicUploads = [
        {"title":"Blessings", "artist":"Big Sean"},
        {"title":"Know Yourself", "artist":"Drake"},
        {"title":"We Dem Boyz","artist":"Wiz Khalifa"}
    ];

    $scope.dummyPrivateUploads = [
        {"title":"Party in the USA", "artist":"Miley Cyrus"},
        {"title":"All About That Bass", "artist":"Megan Trainor"}
    ];
  }]);
