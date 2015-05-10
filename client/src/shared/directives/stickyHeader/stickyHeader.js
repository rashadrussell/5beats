'use strict';

angular.module('5BeatsApp')
.directive('stickyHeader', function() {
  return {
  	restrict: 'A',
    templateUrl: '/shared/directives/stickyHeader/stickyHeader.html'
  };
});
