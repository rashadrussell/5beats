angular.module('5BeatsServices', [])
    .factory('Users', function($http){
        // Factory for Users
        return{
            //// method to get all users in database
            getAllUsers : function(){
                var baseUrl = 'http://localhost:4000/api/users';
                return $http.get(baseUrl);
            },
            //// method to get specific user (param: id)
            getUser : function(id){
                var baseUrl = 'http://localhost:4000/api/users/'+id;
                return $http.get(baseUrl);
            }
        }
    })
    .factory('Songs', function($http){
        // Factory for Songs
        return{
            //// method to get public uploads of specific user (param: id)
            getUploads : function(userid, isPublic){
                var baseUrl
                if(!userid) {
                    baseUrl = 'http://localhost:4000/api/songs';
                } else {
                    baseUrl = 'http://localhost:4000/api/songs?where={"uploaderID": "'+userid+'","isPublic":'+isPublic+'}';
                }

                return $http.get(baseUrl);
            },
            postUpload : function(songURL, albumArtURL, title, artist, uploaderID, isPublic){
                var baseUrl = 'http://localhost:4000/api/songs';
                var song = {
                    songURL: songURL,
                    title: title.replace(/\0/g, ''),
                    artist: artist.replace(/\0/g, ''),
                    uploaderID: uploaderID,
                    albumArtURL: albumArtURL,
                    isPublic: isPublic
                };
                // Build http request
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    data: song
                };
                return $http(req);
            }
        }
    })
;
