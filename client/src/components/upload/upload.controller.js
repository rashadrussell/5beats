'use strict';

angular.module('5BeatsApp')
  .controller('UploadCtrl', ['$scope', 'Songs', function ($scope, Songs) {
    $scope.message = 'Hello';

    $scope.fileNameChanged = function() {

        var file = $('input[type="file"]')[0].files[0],
            albumArtURL = $('.coverArtURL').val(),
            formTitle = $('.songTitle').val();

          var reader = new FileReader();

          reader.onload = function(e) {
            var dv = new jDataView(this.result);

            // "TAG" starts at byte -128 from EOF.
            // See http://en.wikipedia.org/wiki/ID3
            if (dv.getString(3, dv.byteLength - 128) == 'TAG') {
              var title = dv.getString(30, dv.tell());
              var artist = dv.getString(30, dv.tell());
              var album = dv.getString(30, dv.tell());
              var year = dv.getString(4, dv.tell());

              title = formTitle || "No Title";

                var songURL = "media/music/" + file.name;
                // Post new upload to database
                Songs.postUpload(songURL, albumArtURL, title, artist, "554e5dc1ffc17f2666ba527b", true).success(function(data){
                    var uploadedFileID = data.data._id;

                    var fileSelect = document.getElementById('fileSelector');

                    var files = fileSelect.files;

                    var formData = new FormData();
                    for (var i = 0; i < files.length; i++) {
                      var file = files[i];
                      console.log(file);
                      formData.append('songs', file, file.name);
                    }

                    var ajaxRequest = new XMLHttpRequest();
                    ajaxRequest.open('POST', 'http://104.236.192.103:4000/api/upload?objectid='+uploadedFileID, true);
                    ajaxRequest.onload = function () {
                      if (ajaxRequest.status === 201) {
                        console.log("Upload complete!");
                      } else {
                        alert('An error occurred!');
                      }
                    };
                    console.log(formData);
                    ajaxRequest.send(formData);
                })
                .error(function(data){
                    console.log(data.message);
                });

            } else {
              // no ID3v1 data found.
            }
          };

          reader.readAsArrayBuffer(file);
        };
  }]);
