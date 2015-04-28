'use strict';

angular.module('5BeatsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile',
        templateUrl: 'components/profile/profile.html',
        controller: 'ProfileCtrl',
        data: {
        	css: 'assets/stylesheets/components/profile/profile.css'
        }
      });
  });