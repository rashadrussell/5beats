'use strict';

angular.module('5BeatsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('upload', {
        url: '/upload',
        templateUrl: 'components/profile/profile.html',
        controller: 'UploadCtrl',
        data: {
        	css: 'assets/stylesheets/components/upload/upload.css'
        }
      });
  });