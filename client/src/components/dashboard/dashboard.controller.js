'use strict';

angular.module('5BeatsApp')
  .controller('DashboardCtrl', ['$scope', '$rootScope', '$http', 'Songs', 'Users', function ($scope, $rootScope, $http, Songs, Users) {
    

    Songs.getUploads().success(function(data) {

      var songs = data.data;
      $scope.songs = [];

      angular.forEach(songs, function(song) {
          Users.getUser(song.uploaderID).success(function(data) {
            var user = data.data;
            console.log(user.userName);

            $scope.songs.push({
              title: song.title,
              artist: song.artist,
              uploader: user.userName,
              albumArtURL: song.albumArtURL,
              songURL: song.songURL
            });
          });
      });

      Users.getUser()

    }).error(function(err) {
      console.log(err);
    });


  }]);
