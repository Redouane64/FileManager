define([
    "knockout",
    "text"
], function (ko, text) {
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
