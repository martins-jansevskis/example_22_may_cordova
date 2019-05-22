/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        console.log(navigator.camera);

        var scope = this;
        var takePicBtn = document.getElementById('takeAPic');
        takePicBtn.onclick = function() {
          // Take picture on click
          scope.takePictureFunction();
        };

        var secondBtn = document.getElementById('selectFile');
        secondBtn.onclick = function() {
            console.log("clicked");
            scope.selectFile();
        };

        var thirdBtn =  document.getElementById('doSomethingWithFile');
        thirdBtn.onclick = function() {
            console.log("clicked");
            scope.doSomethingElseWithFile();
        };
    },

    doSomethingElseWithFile: function() {
        console.log("third option");
        var scope = this;
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URL,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
        });

        function onSuccess(imageData) {
            // var image = document.getElementById('myImage');
            // image.src = "data:image/jpeg;base64," + imageData;
            getFileEntry(imageData)
        };

        function onFail(message) {
            alert('Failed because: ' + message);
        };

        function getFileEntry(imgUri) {
            console.log("get file entry");
            window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {

                // Do something with the FileEntry object, like write to it, upload it, etc.
                // writeFile(fileEntry, imgUri);
                console.log("got file: " + fileEntry.fullPath);
                // displayFileData(fileEntry.nativeURL, "Native URL");

            }, function () {
                console.log("this should be create a new file");
              // If don't get the FileEntry (which may happen when testing
              // on some emulators), copy to a new FileEntry.
                scope.createNewFileEntry(imgUri);
            });
        };
    },

    createNewFileEntry: function (imgUri) {
        console.log("create a new file here");
        window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {

            // JPEG file
            dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {

                // Do something with it, like write to it, upload it, etc.
                // writeFile(fileEntry, imgUri);
                console.log("got file: " + fileEntry.fullPath);
                // displayFileData(fileEntry.fullPath, "File copied to");

            }, onErrorCreateFile);

        }, function(e){console.log("error to file", e);});
    },

    selectFile: function() {
        console.log("select file on click");
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
        });

        function onSuccess(imageData) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
        };

        function onFail(message) {
            alert('Failed because: ' + message);
        };
    },

    takePictureFunction: function() {
        navigator.camera.getPicture(onSuccess, onFail, {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL
            });

            function onSuccess(imageData) {
                var image = document.getElementById('myImage');
                image.src = "data:image/jpeg;base64," + imageData;
            };

            function onFail(message) {
                alert('Failed because: ' + message);
            };
        },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

app.initialize();
