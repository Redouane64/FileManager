//
var File = function (data) {
    
    let self = this;

    self.name = data.fileName;
    self.size = filesize(data.size);
    self.modified = moment(data.lastModified).fromNow();
    self.location = data.location;

    let iconFromFilename = function (filename) {
        if(filename.endsWith("txt")) {
            return "images/txt-file-icon.png";
        } else if(filename.endsWith("jpg") || filename.endsWith("jpeg")) {
            return "images/jpg-file-icon.png";
        } else {
            return "images/file-icon.png";
        }
    }

    this.icon = iconFromFilename(self.name);

    this.delete = function () {
        console.log("Delete file: ", self.name);
    };

    this.view = function () {
        console.log("View file: ", self.name);        
    };
}

var FileManagerViewModel = function () {
    
    let self = this;
    const url = "http://localhost:5000/api/files";

    self.getfiles = function () {
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

    self.file = ko.observable();
    self.file.subscribe(function () {
        self.upload();
    });

    self.refersh = function () {
        self.getfiles();
    };

    self.upload = function () {
        console.log("Upload file: ", self.file());
    };

};

(function() {
    
    var filePicker = document.getElementById("file");
    var uploadButton = document.getElementById("upload-btn");
    
    if(uploadButton && filePicker)
    {
        uploadButton.onclick = function () {
            filePicker.click();
        }
    }

})();

