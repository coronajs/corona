"use strict";
var Promise = require('bluebird');
var _ = require('lodash');
var FakeMemoryAdapter = (function () {
    function FakeMemoryAdapter(datasource) {
        this.datasource = datasource;
        this.data = {};
    }
    FakeMemoryAdapter.prototype._findMatchKeys = function (query) {
        var _this = this;
        return Object.keys(this.data).filter(function (key) {
            var ret = true;
            for (var qk in query) {
                if (query.hasOwnProperty(qk)) {
                    var q = query[qk];
                    ret = ret && q == _this.data[key][qk];
                }
            }
            return ret;
        });
    };
    /**
     * get number of matches for the query
     */
    FakeMemoryAdapter.prototype.count = function (query) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var count = self._findMatchKeys(query).length;
            resolve(count);
        });
    };
    // bulkInsert(record:T[]):PromiseLike<T[]>;
    /**
     * find out all the matched records
     */
    FakeMemoryAdapter.prototype.find = function (query, option) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var keys = self._findMatchKeys(query);
            resolve(_.cloneDeep(keys.map(function (key) { return self.data[key]; })));
        });
    };
    ;
    /**
     * find the first matched record
     */
    FakeMemoryAdapter.prototype.findOne = function (query, option) {
        var self = this;
        return new Promise(function (resolve, reject) {
            for (var key in self.data) {
                if (self.data.hasOwnProperty(key)) {
                    var ret = true;
                    for (var qk in query) {
                        if (query.hasOwnProperty(qk)) {
                            var q = query[qk];
                            ret = ret && q == self.data[key][qk];
                        }
                    }
                    if (ret) {
                        resolve(_.cloneDeep(self.data[key]));
                        break;
                    }
                }
            }
            resolve(null);
        });
    };
    ;
    /**
     * update all the matched records
     */
    FakeMemoryAdapter.prototype.update = function (query, updates) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var keys = self._findMatchKeys(query);
            keys.map(function (key) {
                var d = self.data[key];
                for (var update in updates) {
                    if (updates.hasOwnProperty(update)) {
                        d[update] = updates[update];
                    }
                }
            });
            resolve(keys.length);
        });
    };
    ;
    /**
     * remove all the matched records
     */
    FakeMemoryAdapter.prototype.remove = function (query) {
        throw new Error('Not implemented');
    };
    ;
    /**
     * insert a record
     */
    FakeMemoryAdapter.prototype.insert = function (record) {
        throw new Error('Not implemented');
    };
    ;
    FakeMemoryAdapter.prototype.get = function (id) {
        throw new Error('Not implemented');
    };
    return FakeMemoryAdapter;
}());
exports.FakeMemoryAdapter = FakeMemoryAdapter;
//# sourceMappingURL=FakeMemoryAdapter.js.map