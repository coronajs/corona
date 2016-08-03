"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events_1 = require('events');
var _ = require('lodash');
var BaseModel = (function (_super) {
    __extends(BaseModel, _super);
    function BaseModel(data, key, parent) {
        _super.call(this);
        this.presisted = true;
        this.changed = false;
        this.primaryKey = '_id';
        this.isDisposed = false;
        this.data = data;
        this.key = key || '';
        this.children = [];
        this.parent = parent;
        if (parent) {
            this.root = parent.root;
        }
        else {
            this.root = this;
        }
    }
    /**
     * return a copy of specific keypath
     */
    BaseModel.prototype.get = function (keypath) {
        if (keypath === void 0) { keypath = ''; }
        throw new Error('Not implemented');
    };
    /**
     * return a new child model which corresponding keypath
     */
    BaseModel.prototype.getModel = function (keypath) {
        if (keypath === void 0) { keypath = ''; }
        throw new Error('Not implemented');
    };
    /**
     * set value
     */
    BaseModel.prototype.set = function (keypath, value) {
        throw new Error('Not implemented');
    };
    /**
     * retrieve value, and if not exists then invoke callback to calculate value
     * and save to the keypath
     */
    BaseModel.prototype.fetch = function (keypath, missing) {
        throw new Error('Not implemented');
    };
    BaseModel.prototype.valueOf = function () {
        return _.cloneDeep(this.data);
    };
    BaseModel.prototype.toString = function () {
        return this.data.toString();
    };
    Object.defineProperty(BaseModel.prototype, "id", {
        get: function () {
            return this.data[this.primaryKey];
        },
        set: function (newValue) {
            if (!this.data[this.primaryKey])
                this.data[this.primaryKey] = newValue;
        },
        enumerable: true,
        configurable: true
    });
    BaseModel.prototype.dispose = function () {
        if (!this.isDisposed) {
            this.emit('dispose', this);
            this.isDisposed = true;
        }
    };
    return BaseModel;
}(events_1.EventEmitter));
exports.BaseModel = BaseModel;
//# sourceMappingURL=baseModel.js.map