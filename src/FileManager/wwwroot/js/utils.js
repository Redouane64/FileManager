define([
    "axios"
], function (axios) {
    "use strict";
    var upload = function (url, data, config, callbacks) {
        axios.post(url, data, config)
            .then(callbacks.success)
            .catch(callbacks.fail);
    };

    var erase = function (url, data, callbacks) {
        axios.delete(url, data)
            .then(callbacks.success)
            .catch(callbacks.fail);
    };

    var download = function (url, callbacks) {
        axios.get(url)
            .then(callbacks.success)
            .catch(callbacks.fail);
    };

    var peek = function (url, callbacks) {
        axios.head(url)
            .then(callbacks.success)
            .catch(callbacks.fail);
    };

    return {
        upload,
        erase,
        download,
        peek
    };
});