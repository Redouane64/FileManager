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
                console.log(error);
             });
    };

    self.files = ko.observableArray(self.getfiles());
    self.uploading = ko.observable(false);

    self.file = ko.observable();
    self.file.subscribe(function () {
        self.upload();
    });

    self.refersh = function () {
        self.getfiles();
    };

    self.upload = function () {

        let data = new FormData();
        data.append("File", document.getElementById("file").files[0]);

        self.uploading(true);
        console.log(self.uploading());
        axios.post(apiUrl, data)
             .then(function (response) {
                 self.uploading(false);
                 console.log(self.uploading());

                 self.refersh();
             })
             .catch(function (error) {  
                 self.uploading(false);
                 console.log(error);
             });
    };

    self.delete = function (file) {

        var data = {
            data: file.name
        };

        axios.delete(url, data);
    };

    self.view = function (file) {
        var preview = window.open(file.location, "height=300,width=300");
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

