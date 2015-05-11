'use strict';

angular.module('5BeatsApp')
.directive('songSlider', function() {
  return {
  	restrict: 'E',
    templateUrl: '/shared/directives/songSlider/songSlider.html',
    link: function(scope, element, attr) {
    	/*
    	element.find('li').on('mouseenter', function(event) {
    		
    	});*/
    },
    controller: ['$scope', '$http', function($scope, $http) {
    	$scope.showControls = false;

    	$scope.hover = function() {
    		console.log('hello');
    		$scope.showControls  != $scope.showControls;

    	};

    }]
  };
});
