"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var model_1 = require('./model');
/**
 * ArrayModel represent a list of model object
 * this will emit length change events
 */
var ArrayModel = (function (_super) {
    __extends(ArrayModel, _super);
    /*
     */
    function ArrayModel(data) {
        _super.call(this, data);
    }
    ArrayModel.prototype.getObject = function (index) {
        return this.data[index];
    };
    Object.defineProperty(ArrayModel.prototype, "length", {
        get: function () {
            return this.data.length;
        },
        enumerable: true,
        configurable: true
    });
    ArrayModel.prototype.push = function (element) {
        this.emit('push', element);
        this.emit('change', 'length', this.data.length);
        return this.data.length;
    };
    ArrayModel.prototype.pop = function () {
        var el = this.data.pop();
        this.emit('change', 'length', this.data.length);
        this.emit('pop', el);
        return el;
    };
    ArrayModel.prototype.shift = function () {
        var m = this.data.shift();
        this.emit('shift', m);
        return m;
    };
    ArrayModel.prototype.unshift = function (el) {
        this.data.unshift(el);
        this.emit('unshift', el);
        return this.data.length;
    };
    ArrayModel.prototype.splice = function (index, count) {
        return this.splice(index, count);
    };
    /**
     * slice a part of continous element in array
     */
    ArrayModel.prototype.slice = function () {
    };
    return ArrayModel;
}(model_1.Model));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ArrayModel;
//# sourceMappingURL=ArrayModel.js.map