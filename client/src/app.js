'use strict';

angular.module('5BeatsApp', [
  'ui.router',
  'uiRouterStyles'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    //$urlRouterProvider.otherwise('/dashboard');

    $locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
});

