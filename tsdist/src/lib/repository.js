"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events_1 = require('events');
var ModelContainer_1 = require('./model/ModelContainer');
var NullAdapter_1 = require('./adapters/NullAdapter');
var Promise = require('bluebird');
var lodash_1 = require('lodash');
/**
 * Repository is used for storing and retrieving Models
 * E entity type
 * T Model type
 */
var Repository = (function (_super) {
    __extends(Repository, _super);
    function Repository(modelClass, adapter) {
        if (adapter === void 0) { adapter = new NullAdapter_1.default(); }
        _super.call(this);
        this.modelClass = modelClass;
        this.adapter = adapter;
        /**
         * keep models in memory and unique
         */
        this.identityMap = {};
    }
    /**
     * retrieve a model
     * if model exists in identity map then return from identity map
     * if model does not exist in identity map then create the model and store in identity map
     */
    Repository.prototype.retrieve = function (key) {
        var _this = this;
        if (this.identityMap[key]) {
            return Promise.resolve(this.identityMap[key]);
        }
        else {
            return this.adapter.get(key).then(function (entity) {
                var m = new _this.modelClass(entity);
                _this.identityMap[m.id] = m;
                return m;
            });
        }
    };
    /**
     * store a model
     */
    Repository.prototype.store = function (model) {
        var primaryKey = model.primaryKey;
        if (model.id) {
            return this.adapter.update({ primaryKey: model.id }, model.valueOf()).then(function (data) {
                return model;
            });
        }
        else {
            return this.adapter.insert(model.valueOf()).then(function (rec) {
                model.id = rec[primaryKey];
                return model;
            });
        }
    };
    /**
     *
     */
    Repository.prototype.create = function (entity) {
        var _this = this;
        return this.adapter.insert(entity).then(function (entity) {
            var m = new _this.modelClass(entity);
            _this.identityMap[m.id] = m;
            return Promise.resolve(m);
        });
    };
    /**
     * remove a model from memory
     */
    Repository.prototype.remove = function (key) {
        var m = this.identityMap[key];
        delete this.identityMap[key];
        this.emit("delete", key, m);
        m.dispose();
    };
    // detach(m: M){
    //   if(this.identityMap[m.id]){
    //     delete this.identityMap[m.id];
    //     this.emit('detach', m.id, m);
    //   }
    // }
    Repository.prototype.fetch = function (key, missing) {
        var _this = this;
        return this.retrieve(key).then(function (value) {
            if (!value) {
                value = missing();
                _this.store(value);
            }
            return value;
        });
    };
    Repository.prototype.toModel = function () {
        if (this.container) {
            return this.container;
        }
        this.container = new ModelContainer_1.default(lodash_1.clone(this.identityMap));
        return this.container;
    };
    return Repository;
}(events_1.EventEmitter));
exports.Repository = Repository;
//# sourceMappingURL=repository.js.map