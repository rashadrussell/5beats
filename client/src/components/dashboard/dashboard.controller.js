'use strict';

angular.module('5BeatsApp')
  .controller('DashboardCtrl', function ($scope, $http) {
    $scope.message = 'Hello';
    var apikey='9d9tr5q54gdzr2mhnquenb4e';
    var shared='5nJFQnqejy';
    var seconds= Math.round(new Date().getTime()/1000);
    var key=apikey+shared+seconds.toString();
    var sig=CryptoJS.MD5(key);
    //query=my+way&entitytype=song&facet=type&facet=genre&filter=genreid:MA0000002613&size=1
    $scope.store;
    function request_by_title(title){
      console.log(title);
      title=title.replace(/ /g, "+");
      console.log(title);
      $http.get('http://api.rovicorp.com/search/v2.1/music/search?apikey=9d9tr5q54gdzr2mhnquenb4e&sig='+sig+'&query='+title+'&entitytype=song&facet=type&facet=genre&include=album&size=1').success(
        function(data, status, headers, config) {
          $scope.store=data.searchResponse.results[0].song.primaryArtists[0].name.toString();
        console.log(data.searchResponse.results[0].song.primaryArtists[0]);
        console.log(name);
        console.log($scope.store);
      // this callbck will be called asynchronously
      // when the response is available
    }).error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  }
  var store='hello';
  request_by_title('Drunk in Love',store);

    var request_by_artist=function(artist){
      $http.get('http://api.rovicorp.com/search/v2.1/music/search?apikey=9d9tr5q54gdzr2mhnquenb4e&sig='+sig+'&query=drunk+in+love&entitytype=song&facet=type&facet=genre&size=1').
      success(function(data, status, headers, config) {
      console.log(data.searchResponse.results[0].song);
      return data.searchResponse.results[0].song;
      // this callback will be called asynchronously
      // when the response is available
    }).error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

    }



  });
