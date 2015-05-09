'use strict';

angular.module('5BeatsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('upload', {
        url: '/upload',
        templateUrl: 'components/upload/upload.html',
        controller: 'UploadCtrl',
        data: {
        	css: 'assets/stylesheets/components/upload/scss/upload.css'
        }
      });
  });