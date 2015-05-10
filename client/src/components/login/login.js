'use strict';

angular.module('5BeatsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'components/login/login.html',
        controller: 'LoginCtrl',
        data: {
        	css: 'assets/stylesheets/components/login/scss/login.css'
        }
      });
  });