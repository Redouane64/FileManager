//
var File = function (data) {
    
    var self = this;

    self.name = data.filename;
    self.size = data.size;
    self.modified = data.lastModified;
    self.location = data.location;

    var iconFromFilename = function (filename) {
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
    var self = this;

    self.files = ko.observableArray([
        new File({ filename: "index.jpeg", size: filesize(128), lastModified: moment("20190115", "YYYYMMDD").fromNow() }),
        new File({ filename: "page.txt", size: filesize(2049), lastModified: moment("20190110", "YYYYMMDD").fromNow() }),
        new File({ filename: "style.jpg", size: filesize(3650), lastModified: moment("20181215", "YYYYMMDD").fromNow() }),
        new File({ filename: "ReadMe.txt", size: filesize(4096), lastModified: moment("20190120", "YYYYMMDD").fromNow() })
    ]);

    self.file = ko.observable();
    self.file.subscribe(function () {
        self.upload();
    });

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

