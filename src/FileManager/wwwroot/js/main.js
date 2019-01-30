//
var File = function (data)
{

    var self = this;

    self.name = data.name;
    self.size = filesize(data.size);
    self.modified = moment(data.lastModifiedDate).fromNow();
    self.location = data.location;
    self.type = data.type;
    self.icon = (function ()
    {
        return "assets/file-icon.png";
    })();

};

var uploadFile = function (url, data, callbacks)
{
    axios.post(url, data)
        .then(callbacks.success)
        .catch(callback.fail);
};

var deleteFile = function (url, data, callbacks)
{
    axios.delete(url, data)
         .then(callbacks.success)
         .catch(callbacks.fail);
};

var downloadFiles = function (url, callbacks)
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
        console.log("Fetching data from server...");
        downloadFiles(self.apiUrl, {
            success: function (response) {
                response.data.map(function (e) {
                    return new File(e);
                }).forEach(function (file) {

                    // TODO: attach missing data to file.
                    file.location = self.apiUrl.concat("/" + file.name);

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

    // Call fetch to retrieve remote data.
    self.fetch();

    // viewable content-types.
    self.supportedContentTypes = [ "text/plain", "image/jpeg" ];

    self.viewable = function (file) {
        return self.supportedContentTypes.indexOf(file.type) !== -1;
    };

    // delete file.
    self.delete = function (file) {

    };

    // view file.
    self.view = function (file) {
        
    };

    // upload selected file.
    self.send = function (file) {
        file.location = self.apiUrl.concat(file.name);
        var newFile = new File(file);
        self.files.push(newFile);

        // TODO: Send to server.
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

