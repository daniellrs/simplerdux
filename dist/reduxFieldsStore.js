(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.reduxFieldsStore = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var store = undefined;

    exports.default = {
        setStore: function setStore(providedStore) {
            store = providedStore;
        },
        getStore: function getStore() {
            return store;
        }
    };
});