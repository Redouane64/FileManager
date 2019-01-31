//

var File = function (data)
{

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

    self.icon = ko.computed(function ()
    {
        return self.fileIcon[self.type()];
    });

};

var upload = function (url, data, callbacks)
{
    axios.post(url, data)
        .then(callbacks.success)
        .catch(callbacks.fail);
};

var deleteFile = function (url, data, callbacks)
{
    axios.delete(url, data)
         .then(callbacks.success)
         .catch(callbacks.fail);
};

var download = function (url, callbacks)
{
    axios.get(url)
         .then(callbacks.success)
         .catch(callbacks.fail);
};

function FilesViewModel() {
    var self = this;
    
    // api endpoint.
    self.apiUrl = "/api/files/";

    // properties and behaviors.
    self.fetch = function () {
        self.files([]);
        download(self.apiUrl, {
            success: function (response) {
                response.data.map(function (e) {
                    return new File(e);
                }).forEach(function (file) {

                    // TODO: attach missing data to file.
                    axios.head(file.location)
                        .then(function (response)
                        {
                            file.type(response.headers["content-type"]);
                        });

                    self.files.push(file);
                });
            },
            fail: function (error) {
                // TODO: Do something with error.
            }
        });
    };

    // files list.
    self.files = ko.observableArray();

    // viewable content-types.
    self.supportedContentTypes = [ "text/plain", "image/jpeg" ];

    self.viewable = function (file) {
        return self.supportedContentTypes.indexOf(file.type()) !== -1;
    };

    // delete file.
    self.delete = function (file)
    {

    };

    // view file.
    self.view = function (file) {
        
    };

    // upload selected file.
    self.send = function (file) {

        // Send to server.
        var data = new FormData();
        data.append("File", file);

        upload(self.apiUrl, data, {
            success: function ()
            {
                axios.head(self.apiUrl + "peek/" + file.name)
                    .then(function (response)
                    {
                        var newFile = new File(file);

                        newFile.location = response.headers["location"];
                        var value = response.headers["lastmodifieddate"];
                        newFile.modified(value);

                        axios.head(newFile.location)
                            .then(function (response)
                            {
                                newFile.type(response.headers["content-type"]);
                            });

                        self.files.push(newFile);
                    });
            },
            fail: function ()
            {
                // TODO: Do something with error.
            }
        });

    };
};

(function() {
    
    var filePicker = document.getElementById("file");
    var uploadButton = document.getElementById("upload-btn");
    
    if(uploadButton && filePicker)
    {
        uploadButton.onclick = function () {
            filePicker.click();
        };
    }

})();

