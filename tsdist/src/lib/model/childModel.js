"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var baseModel_1 = require('./baseModel');
var ChildModel = (function (_super) {
    __extends(ChildModel, _super);
    function ChildModel(key, parent) {
        _super.call(this, null, key, parent);
    }
    /**
     * return a copy of specific keypath
     */
    ChildModel.prototype.get = function (keypath) {
        if (keypath === void 0) { keypath = ''; }
        if (keypath == '') {
            return this.parent.get(this.key);
        }
        return this.parent.get(this.joinKeypath(keypath));
    };
    ChildModel.prototype.joinKeypath = function (path) {
        return this.key + "." + path;
    };
    /**
     *
     */
    ChildModel.prototype.set = function (keypath, value) {
        this.parent.set(keypath, value);
        return this;
    };
    /**
     * return a new child model which corresponding keypath
     */
    ChildModel.prototype.getModel = function (keypath) {
        if (keypath === void 0) { keypath = ''; }
        if (keypath == '') {
            return this;
        }
        return this.parent.getModel(this.joinKeypath(keypath));
    };
    return ChildModel;
}(baseModel_1.BaseModel));
exports.ChildModel = ChildModel;
//# sourceMappingURL=childModel.js.map