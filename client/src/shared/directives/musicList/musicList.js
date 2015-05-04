'use strict';

angular.module('5BeatsApp')
.directive('musicList', function() {
  return {
  	restrict: 'E',
    templateUrl: '/shared/directives/musicList/musicList.html',
    controller: function($scope) {
    	
    }
  };
});
