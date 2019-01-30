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

var upload = function (url, data, callbacks)
{
    axios.post(url, data)
        .then(callbacks.success)
        .catch(callback.fail);
};

var remove = function (url, data, callbacks)
{
    axios.delete(url, data)
         .then(callbacks.success)
         .catch(callbacks.fail);
};

var download = function (url, fail)
{
    axios.get(apiUrl)
        .then(function (response)
        {
            self.files(response.data.map(function (element)
            {
                return new File(element);
            }));
        })
        .catch(fail);
};

function FilesViewModel() {
    var self = this;
    
    // api endpoint.
    self.apiUrl = "/api/files/";

    // properties.

    // files list.
    self.files = ko.observableArray();

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

var FileManagerViewModel = function () {

    // Upload file to server.
    self.upload = function () {

        var selectedFile = document.getElementById("file").files[0];
        console.log(selectedFile);

        self.files().push(new File({
            fileName: selectedFile.name,
            size: selectedFile.size,
            modified: selectedFile.lastModified
        }));

        /*
        var data = new FormData();
        data.append("File", document.getElementById("file").files[0]);

        axios.post(apiUrl, data)
             .then(function (response) {
                 self.refersh();
             })
             .catch(function (error) {  
                 // TODO:
             });*/
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

