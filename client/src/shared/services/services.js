angular.module('5BeatsServices', [])
    .factory('Users', function($http){
        // Factory for Users
        return{
            //// method to get all users in database
            getAllUsers : function(){
                var baseUrl = 'http://localhost:4000/api/users';
                // Build http request
                var req = {
                    method: 'GET',
                    url: baseUrl
                }
                return $http(req);
            },
            //// method to get specific user (param: id)
            getUser : function(id){
                var baseUrl = 'http://localhost:4000/api/users/'+id;
                // Build http request
                var req = {
                    method: 'GET',
                    url: baseUrl
                }
                return $http(req);
            }
        }
    })
    .factory('Songs', function($http){
        // Factory for Songs
        return{
            //// method to get public uploads of specific user (param: id)
            getUploads : function(userid, isPublic){
                var baseUrl = 'http://localhost:4000/api/songs?where={"uploaderID": "'+userid+'","isPublic":'+isPublic+'}';
                console.log("URLLLL!!: "+baseUrl);
                // Build http request
                var req = {
                    method: 'GET',
                    url: baseUrl
                }
                return $http(req);
            },
            postUpload : function(songURL, title, artist, uploaderID, isPublic){
                console.log("title: " + title);
                console.log("artist: " + artist);
                var baseUrl = 'http://localhost:4000/api/songs';
                console.log("POSTURL: " + baseUrl);
                var song = {
                    songURL: songURL,
                    title: title.replace(/\0/g, ''),
                    artist: artist.replace(/\0/g, ''),
                    uploaderID: uploaderID,
                    isPublic: isPublic
                };
                console.log(song);
                // Build http request
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    data: song
                };
                console.log(req);
                console.log("POST DATA: " + JSON.stringify(req.data));
                return $http(req);
            }
        }
    })
;
