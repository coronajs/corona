"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var baseModel_1 = require('./baseModel');
var childModel_1 = require('./childModel');
/**
 * Models wraps entity object and provides extra events and syncing behavior
 */
var Model = (function (_super) {
    __extends(Model, _super);
    function Model(data, key, parent) {
        _super.call(this, data, key, parent);
    }
    /**
     * return a copy of specific keypath
     */
    Model.prototype.get = function (keypath) {
        if (keypath === void 0) { keypath = ''; }
        if (keypath == '') {
            return _.cloneDeep(this.data);
        }
        return _.cloneDeep(_.get(this.data, keypath));
        // let keypaths = keypath.split('.');
        // let ret: any = this.data;
        // for (var i = 0; i < keypaths.length; i++) {
        //   keypath = keypaths[i];
        //   if (ret.hasOwnProperty(keypath)) {
        //     ret = ret[keypath];
        //   } else {
        //     return undefined;
        //   }
        // }
        // return _.cloneDeep(ret);
    };
    /**
     * return a new child model which corresponding keypath
     */
    Model.prototype.getModel = function (keypath) {
        if (keypath === void 0) { keypath = ''; }
        if (keypath == '') {
            return this;
        }
        var m = new childModel_1.ChildModel(keypath, this);
        this.children[keypath] = m;
        return m;
    };
    /**
     * set value
     * TODO: 当 value 是一个 plain object 的时候，进行合并
     */
    Model.prototype.set = function (keypath, value) {
        if (!keypath || keypath === '') {
            this.data = value;
            this.emit('change', '.', value);
            return;
        }
        var keypaths = keypath.split('.');
        var ret = this.data;
        var last = keypaths.pop();
        keypaths.forEach(function (p) {
            if (!ret[p]) {
                ret[p] = {};
            }
            ret = ret[p];
        });
        if (ret[last] !== value) {
            this.emit('change', keypath, value, ret[last]);
            ret[last] = value;
        }
    };
    /**
     * retrieve value, and if not exists then invoke callback to calculate value
     * and save to the keypath
     */
    Model.prototype.fetch = function (keypath, missing) {
        var v = this.get(keypath);
        if (!v) {
            v = missing();
            this.set(keypath, v);
        }
        return v;
    };
    Model.prototype.toJSON = function () {
        return {
            id: this.id,
            className: 'Model',
            data: this.data
        };
    };
    return Model;
}(baseModel_1.BaseModel));
exports.Model = Model;
// export class ChildModel<T> extends Model<T> {
//   constructor(data:T){
//     super(data);
//   }
// }
/**
 *
 */
// export class SliceModel extends ArrayModel {
// }
//# sourceMappingURL=model.js.map