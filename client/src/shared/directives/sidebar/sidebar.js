'use strict';

angular.module('5BeatsApp')
.directive('sidebar', function() {
  return {
  	restrict: 'AE',
    templateUrl: '/shared/directives/sidebar/sidebar.html'
  };
});
