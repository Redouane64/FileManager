//
var File = function (data)
{

    var self = this;

    self.name = data.fileName;
    self.size = filesize(data.size);
    self.modified = moment(data.lastModified).fromNow();
    self.location = data.location;

    var iconFromFilename = function (filename)
    {
        if (filename.endsWith("txt"))
        {
            return "assets/txt-file-icon.png";
        } else if (filename.endsWith("jpg") || filename.endsWith("jpeg"))
        {
            return "assets/jpg-file-icon.png";
        } else
        {
            return "assets/file-icon.png";
        }
    };

    self.icon = iconFromFilename(self.name);

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
        var preview = window.open(file.location, "_blank");
        preview.focus();
    };

    self.viewable = ko.observable(false);
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

