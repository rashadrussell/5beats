'use strict';

angular.module('5BeatsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'components/home/home.html',
        controller: 'HomeCtrl',
        data: {
        	css: 'assets/stylesheets/components/home/scss/home.css'
        }
      });
  });