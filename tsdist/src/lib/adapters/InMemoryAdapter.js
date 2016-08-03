"use strict";
var _ = require('lodash');
var Promise = require('bluebird');
var InMemoryAdapter = (function () {
    function InMemoryAdapter() {
        this.db = {};
    }
    InMemoryAdapter.prototype.get = function (id) {
        return Promise.resolve(this.db[id]);
    };
    /**
     * insert a record
     */
    InMemoryAdapter.prototype.insert = function (record) {
        this.db[record['id']] = record;
        return Promise.resolve(record);
    };
    /**
     * get number of matches for the query
     */
    InMemoryAdapter.prototype.count = function (query, options) {
        return Promise.resolve(_.reduce(this.db, function (sum, rec) { return sum + query(rec) ? 1 : 0; }, 0));
    };
    // bulkInsert(record:T[]):PromiseLike<T[]>;
    /**
     * find out all the matched records
     */
    InMemoryAdapter.prototype.find = function (query, option) {
        return Promise.resolve(_.filter(this.db, query));
    };
    /**
     * find the first matched record
     */
    InMemoryAdapter.prototype.findOne = function (query, option) {
        return Promise.resolve(_.find(this.db, query));
    };
    /**
     * update all the matched records
     */
    InMemoryAdapter.prototype.update = function (query, operations, options) {
        var _this = this;
        var count = 0;
        _.forEach(this.db, function (rec, id) {
            if (query(rec)) {
                _this.db[id] = operations(rec);
                count++;
            }
        });
        return Promise.resolve(count);
    };
    /**
     * remove all the matched records
     */
    InMemoryAdapter.prototype.remove = function (query, options) {
        var count = _.size(this.db);
        this.db = _.reject(this.db, query);
        return Promise.resolve(count - _.size(this.db));
    };
    return InMemoryAdapter;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InMemoryAdapter;
//# sourceMappingURL=InMemoryAdapter.js.map