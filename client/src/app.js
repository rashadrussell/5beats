'use strict';

angular.module('5BeatsApp', [
  'ui.router',
  'uiRouterStyles',
  '5BeatsServices',
  'flow'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/dashboard');

    $locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
    
})
.run(function($rootScope) {
    $rootScope.$on('$viewContentLoaded', function () {
        $(document).foundation();
    });
    $rootScope.musicQueue = [];
    $rootScope.addToQueue = function(song) {
        $rootScope.musicQueue.push(song);
    }
    
});



