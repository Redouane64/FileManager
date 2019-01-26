//
var File = function (data) {
    
    this.name = data.filename;
    this.size = data.size;
    this.lastModified = data.lastModified;
    this.location = data.location;

    this.icon = (function () {
        
    })();

    this.delete = function () {
        
    };

    this.view = function () {
        
    };
}

var FileManagerViewModel = function () {
    var self = this;

    self.files = ko.observableArray([
        { icon: "images/file-icon.png", filename: "index.js", size: filesize(128), lastModified: moment("20190115", "YYYYMMDD").fromNow() },
        { icon: "images/file-icon.png", filename: "page.html", size: filesize(2049), lastModified: moment("20190110", "YYYYMMDD").fromNow() },
        { icon: "images/file-icon.png", filename: "style.css", size: filesize(3650), lastModified: moment("20181215", "YYYYMMDD").fromNow() },
        { icon: "images/file-icon.png", filename: "ReadMe.txt", size: filesize(4096), lastModified: moment("20190120", "YYYYMMDD").fromNow() }
    ]);

    self.file = ko.observable();
    self.file.subscribe(function () {
        self.upload();
    });

    self.view = function () {
        
    };

    self.upload = function () {
        console.log("Value of FILE: ", self.file());
    };

    self.delete = function () {
        
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

