define([
    "knockout",
    "text"
], function(ko, text) {
    "use strict";
    
    ko.components.register("file-manager", {
        viewModel: {
            require: "Components/fileManagerViewModel" 
        },
        template: {
            require: "text!Components/file-manager.html"
        }
    });

    ko.applyBindings();
});

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

