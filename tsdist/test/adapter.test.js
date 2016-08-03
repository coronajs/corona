'use strict';
var adapter_1 = require('./fakeData/exam/adapter');
var database_1 = require('./fakeData/exam/database');
var chai_1 = require('chai');
var _ = require('lodash');
describe('Adapter', function () {
    it('count', function (done) {
        var data = _.cloneDeep(database_1.TExam);
        var adp = new adapter_1.ExamAdapter(data);
        adp.count({
            sex: 'female'
        }).then(function (count) {
            chai_1.assert(count == data.filter(function (v) { return v.sex == 'female'; }).length);
            done();
        });
    });
    it('find', function (done) {
        var data = _.cloneDeep(database_1.TExam);
        var adp = new adapter_1.ExamAdapter(data);
        adp.find({
            lastName: 'Ren',
            firstName: 'Jian',
        }).then(function (matches) {
            chai_1.assert(matches.length == data.filter(function (v) { return v.lastName == 'Ren' && v.firstName == 'Jian'; }).length);
            done();
        });
    });
    it('findOne', function (done) {
        var data = _.cloneDeep(database_1.TExam);
        var adp = new adapter_1.ExamAdapter(data);
        adp.findOne({
            sex: 'male'
        }).then(function (match) {
            chai_1.assert(match != null);
            done();
        });
    });
    it('findOne not exsit', function (done) {
        var data = _.cloneDeep(database_1.TExam);
        var adp = new adapter_1.ExamAdapter(data);
        adp.findOne({
            lastName: 'Xu'
        }).then(function (match) {
            chai_1.assert(match == null);
            done();
        });
    });
    it('update', function (done) {
        var data = _.cloneDeep(database_1.TExam);
        var adp = new adapter_1.ExamAdapter(data);
        adp.update({
            sex: 'male'
        }, {
            score: 100
        }).then(function (success) {
            chai_1.assert(success);
            chai_1.assert(data.filter(function (v) { return v.sex == 'male'; }).length == data.filter(function (v) { return v.score == 100; }).length);
            done();
        });
    });
    it('remove', function (done) {
        var data = _.cloneDeep(database_1.TExam);
        var adp = new adapter_1.ExamAdapter(data);
        adp.remove({
            sex: 'male'
        }).then(function (count) {
            chai_1.assert(count == database_1.TExam.filter(function (v) { return v.sex == 'male'; }).length);
            chai_1.assert(data.length == database_1.TExam.length - count);
            done();
        });
    });
    it('insert', function (done) {
        var data = _.cloneDeep(database_1.TExam);
        var adp = new adapter_1.ExamAdapter(data);
        adp.insert({
            firstName: 'Xiaomeng',
            middleName: '',
            lastName: 'Xu',
            sex: 'male',
            score: 100
        }).then(function (newRecord) {
            chai_1.assert(newRecord.id);
            chai_1.assert(database_1.TExam.length == data.length - 1);
            done();
        });
    });
    it('get by id', function (done) {
        var data = _.cloneDeep(database_1.TExam);
        var adp = new adapter_1.ExamAdapter(data);
        adp.get(7).then(function (record) {
            chai_1.assert(record.id);
            done();
        });
    });
});
//# sourceMappingURL=adapter.test.js.map