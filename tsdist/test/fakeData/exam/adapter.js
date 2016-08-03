"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FakeMemoryAdapter_1 = require('./../../fakeAdapter/FakeMemoryAdapter');
var Promise = require('bluebird');
var _ = require('lodash');
var ExamAdapter = (function (_super) {
    __extends(ExamAdapter, _super);
    function ExamAdapter(datasource) {
        _super.call(this, datasource);
        this.datasource = datasource;
        for (var i = 0; i < datasource.length; i++) {
            var d = datasource[i];
            this.data[d.id.toString()] = d;
        }
    }
    /**
     * remove all the matched records
     */
    ExamAdapter.prototype.remove = function (query) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var keys = self._findMatchKeys(query);
            keys.map(function (key) {
                var index = self.datasource.indexOf(self.data[key]);
                self.datasource.splice(index, 1);
                delete self.data[key];
            });
            resolve(keys.length);
        });
    };
    ;
    /**
     * insert a record
     */
    ExamAdapter.prototype.insert = function (record) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var id = _.maxBy(self.datasource, 'id')['id'] + 1;
            record.id = id;
            self.datasource.push(record);
            self.data[record.id.toString()] = record;
            resolve(record);
        });
    };
    ;
    ExamAdapter.prototype.get = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.data[id.toString()]) {
                resolve(_.cloneDeep(_this.data[id.toString()]));
            }
            else {
                resolve(undefined);
            }
        });
    };
    return ExamAdapter;
}(FakeMemoryAdapter_1.FakeMemoryAdapter));
exports.ExamAdapter = ExamAdapter;
//# sourceMappingURL=adapter.js.map