//
var File = function (data) {
    
    let self = this;

    self.name = data.fileName;
    self.size = filesize(data.size);
    self.modified = moment(data.lastModified).fromNow();
    self.location = data.location;

    let iconFromFilename = function (filename) {
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

    this.icon = iconFromFilename(self.name);

    this.delete = function () {

    };

    this.view = function () {

    };
}

var FileManagerViewModel = function () {
    
    let self = this;
    const url = "/api/files";

    self.getfiles = function ()
    {
        axios.get(url)
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
    self.uploadPercentage = ko.observable();

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

        let config = {
            onUploadProgress: function (e)
            {
                self.uploadPercentage(Math.round((e.loaded * 100) / e.total) + " px");
            }
        };

        axios.post(url, data, config)
             .then(function (response) {
                 self.refersh();
             })
             .catch(function (error) {  
                 console.log(error);
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

