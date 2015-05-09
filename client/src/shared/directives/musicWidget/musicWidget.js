'use strict';

angular.module('5BeatsApp')
.directive('musicWidget', function() {
  return {
  	restrict: 'E',
    templateUrl: 'http://localhost:3000/shared/directives/musicWidget/musicWidget.html',
    controller: function($scope) {
    	
    }
  };
});
