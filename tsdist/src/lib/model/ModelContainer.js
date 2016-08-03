"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var model_1 = require('./model');
var lodash_1 = require('lodash');
var ModelContainer = (function (_super) {
    __extends(ModelContainer, _super);
    function ModelContainer(data) {
        if (data instanceof Array) {
            var d = data;
            data = {};
            d.forEach(function (e) {
                data[e.id] = e;
            });
        }
        _super.call(this, data);
    }
    ModelContainer.prototype.getModel = function (keypath) {
        if (keypath === void 0) { keypath = ''; }
        if (keypath == '') {
            return this;
        }
        var keys = keypath.split('.');
        var i = keys.shift();
        if (keys.length == 0) {
            return this.data[i];
        }
        else {
            return this.data[i].getModel(keys.join('.'));
        }
    };
    ModelContainer.prototype.add = function (m) {
        this.data[m.id] = m;
        this.emit('add', m.id, m.toJSON());
    };
    ModelContainer.prototype.remove = function (m) {
        delete this.data[m.id];
        this.emit('remove', m.id);
    };
    ModelContainer.prototype.toJSON = function () {
        return {
            id: null,
            className: "ModelContainer",
            data: lodash_1.mapValues(this.data, function (m) { return m.toJSON(); })
        };
    };
    return ModelContainer;
}(model_1.Model));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ModelContainer;
//# sourceMappingURL=ModelContainer.js.map