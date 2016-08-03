"use strict";
var Promise = require('bluebird');
/**
 * NullAdapter won't persist any entity
 * Repository which uses NullAdapter will actually save model in repository's identity map;
 * NullAdapter will only assign id for entity
 */
var NullAdapter = (function () {
    function NullAdapter() {
        this.seqId = 0;
    }
    NullAdapter.prototype.get = function (id) {
        return;
    };
    /**
     * insert a record
     */
    NullAdapter.prototype.insert = function (record) {
        record['_id'] = this.seqId++;
        return Promise.resolve(record);
    };
    /**
     * get number of matches for the query
     */
    NullAdapter.prototype.count = function (query, options) {
        return Promise.resolve(this.seqId);
    };
    // bulkInsert(record:T[]):PromiseLike<T[]>;
    /**
     * find out all the matched records
     */
    NullAdapter.prototype.find = function (query, option) {
        return Promise.resolve([]);
    };
    /**
     * find the first matched record
     */
    NullAdapter.prototype.findOne = function (query, option) {
        return Promise.resolve(null);
    };
    /**
     * update all the matched records
     */
    NullAdapter.prototype.update = function (query, operations, options) {
        return Promise.resolve(0);
    };
    /**
     * remove all the matched records
     */
    NullAdapter.prototype.remove = function (query, options) {
        return Promise.resolve(0);
    };
    return NullAdapter;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NullAdapter;
//# sourceMappingURL=NullAdapter.js.map