'use strict';

angular.module('5BeatsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'components/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        data: {
        	css: 'assets/stylesheets/components/dashboard/dashboard.css'
        }
      });
  });