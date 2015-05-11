'use strict';

angular.module('5BeatsApp')
.directive('musicWidget', function() {
  return {
  	restrict: 'E',
    templateUrl: 'http://localhost:3000/shared/directives/musicWidget/musicWidget.html',
    link: function(scope, element, attr) {

    },
    controller: ['$scope', '$rootScope', function($scope, $rootScope) {
    	$scope.play = function(song) {
    		$('.music-widget-sidebar .song-cover-art').attr('src', song.albumArtURL);
    		$('.current-song-controls-container audio source').attr('src', "http://localhost:4000/"+song.songURL);
    		$('.current-song-controls-container audio').trigger('load');
    		$('.current-song-controls-container audio').trigger('play');


    	};
    }]
  };
});
