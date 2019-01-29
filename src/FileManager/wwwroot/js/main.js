//
var File = function (data)
{

    var self = this;

    self.name = data.fileName;
    self.size = filesize(data.size);
    self.modified = moment(data.lastModified).fromNow();
    self.location = data.location;
    self.extension = self.name.split(".").pop().toLowerCase();
    self.icon = (function ()
    {
        if (self.extension === "txt")
        {
            return "assets/txt-file-icon.png";
        }
        else if (self.extension === "jpg" || self.extension === "jpeg")
        {
            return "assets/jpg-file-icon.png";
        }
        else
        {
            return "assets/file-icon.png";
        }
    })();

};

var FileManagerViewModel = function () {
    
    var self = this;
    var apiUrl = "/api/files";

    self.getfiles = function ()
    {
        axios.get(apiUrl)
             .then(function (response) {
                self.files(response.data.map(function (element) {
                    return new File(element);
                }));
             })
             .catch(function (error) {
                 // TODO:
             });
    };

    // Files list.
    self.files = ko.observableArray(self.getfiles());

    // File to upload.
    self.file = ko.observable();
    self.file.subscribe(function () {
        self.upload();
    });

    const viewable = ["txt", "jpg", "jpeg"];

    // Check if file of viewable type.
    self.canView = function (extension)
    {
        return viewable.indexOf(extension) != -1;
    };

    // Retrieve files from server.
    self.refersh = function () {
        self.files(self.getfiles());
    };

    // Upload file to server.
    self.upload = function () {

        var data = new FormData();
        data.append("File", document.getElementById("file").files[0]);

        axios.post(apiUrl, data)
             .then(function (response) {
                 self.refersh();
             })
             .catch(function (error) {  
                 // TODO:
             });
    };

    // Delete file from server.
    self.delete = function (file) {

        var data = {
            data: file.name
        };

        axios.delete(apiUrl + "\\" + file.name, data)
             .then(function () {
            self.refersh();
        });
    };

    // Open new window to view a file.
    self.view = function (file) {
        var preview = window.open(file.location);
        preview.focus();
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

