define([
    "knockout",
    "filesize",
    "utils"
], function (ko, filesize, utils) {
    "use strict";

    // data model.
    var File = function (data) {

        var self = this;

        self.fileIcon = {
            "text/plain": "assets/txt-file-icon.png",
            "image/jpeg": "assets/jpg-file-icon.png",
            "application/unknown": "assets/file-icon.png"
        };

        self.name = data.name;
        self.size = filesize(data.size);
        self.modified = ko.observable(data.lastModifiedDate);
        self.location = data.location;

        self.type = ko.observable();

        self.icon = ko.computed(function () {
            return self.fileIcon[self.type()];
        });

    };

    // files viewmodel.
    function FilesViewModel() {
        var self = this;

        // api endpoint urls.
        self.baseUrl = "/api/files/";
        self.peekUrl = self.baseUrl + "peek/";
        self.alertTime = 4000; // ms

        // query files from back-end api.
        self.fetch = function () {
            self.files([]);
            utils.download(self.baseUrl, {
                success: function (response) {

                    // map response data to File objects.
                    response.data.map(function (e) {
                        return new File(e);
                    }).forEach(function (file) {

                        // attach missing data to file:
                        // peek file content-type header from server to determine if
                        // the file is of the viewable type.
                        utils.peek(file.location, {
                            success: function (response) {
                                file.type(response.headers["content-type"]);
                            },
                            fail: function (error) {
                                // TODO: Do something with error.
                                self.signalAlert("Something went wrong!")
                                    .hideAfter(self.alertTime);
                            }
                        });

                        // add file to files list.
                        self.files.push(file);
                    });
                },
                fail: function (error) {
                    // TODO: Do something with error.
                    self.signalAlert("Something went wrong!")
                        .hideAfter(self.alertTime);
                }
            });
        };

        // files list.
        self.files = ko.observableArray();

        // viewable content-types.
        self.supportedContentTypes = ["text/plain", "image/jpeg"];

        self.viewable = function (file) {
            return self.supportedContentTypes.indexOf(file.type()) !== -1;
        };

        // delete file.
        self.delete = function (file) {
            if (confirm("Do you want to delete file?")) {
                utils.erase(file.location, null, {
                    success: function (response) {
                        self.files.remove(file);
                    },
                    fail: function (error) {
                        // TODO: Do something with error.
                        self.signalAlert("Something went wrong!")
                            .hideAfter(self.alertTime);
        }
                });
            }
        };

        // view file.
        self.view = function (file) {
            window.open(file.location);
        };

        // error signal used to show error alert.
        self.hasAlert = ko.observable(false);
        self.alertMessage = ko.observable();
        
        // helper function to set and unset error signal,
        // thus to show error alert in the UI.
        self.signalAlert = function (message) {
            setTimeout(function () {
                self.hasAlert(true);
                self.alertMessage(message);
            }, 150);
            return {
                hideAfter: function (ms) {
                    setTimeout(function () {
                        self.hasAlert(false);
                        self.alertMessage("");
                    }, ms);
                }
            };
        };

        // upload progress.
        self.isUploading = ko.observable(false);
        self.uploadProgress = ko.observable("0%");

        // upload selected file.
        self.send = function (file) {
            
            if(!file) return;

            // check if file already exist.
            if(self.files().some(element => element.name === file.name)) 
            {
                self.signalAlert("File already exist.")
                    .hideAfter(self.alertTime);

                return;
            }

            setTimeout(function () { self.isUploading(true); }, 0);

            // Send to server.
            var data = new FormData();
            data.append("File", file);

            var config = {
                onUploadProgress: function (e) {
                    // track upload progress.
                    self.uploadProgress(Math.round((e.loaded * 100) / e.total) + "%");
                }
            };

            setTimeout(function () {
                utils.upload(self.baseUrl, data, config, {
                    success: function () {
                        var targetUrl = self.peekUrl + file.name;
                        // Send head request to uploaded file to get correct last modified date
                        // and location url to query content-type in the inner peek call (head request)
                        // to determine if type can be viewed (and assgin correct icon in view list).
                        utils.peek(targetUrl, {
                            success: function (response) {
                                var newFile = new File(file);

                                newFile.location = response.headers["location"];
                                newFile.modified(response.headers["lastmodifieddate"]);

                                utils.peek(newFile.location, {
                                    success: function (response) {
                                        newFile.type(response.headers["content-type"]);
                                    },
                                    fail: function (error) {
                                        // TODO: Do something with error.
                                        self.signalAlert("Something went wrong!")
                                            .hideAfter(self.alertTime);
    
                                    }
                                });

                                self.files.push(newFile);
                            },
                            fail: function (error) {
                                // TODO: Do something with error.
                                self.signalAlert("Something went wrong!")
                                    .hideAfter(self.alertTime);
                            }
                        });

                        // Hide upload progress notification after 1000ms.
                        setTimeout(function () { self.isUploading(false); }, 1000);

                    },
                    fail: function (error) {
                        // TODO: Do something with error.
                        self.isUploading(false);
                        self.signalAlert("Something went wrong!")
                            .hideAfter(self.alertTime);
                    }
                });
            }, 1000);
        };
    };

    return FilesViewModel;
});