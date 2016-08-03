'use strict';
var model_1 = require('../src/lib/model/model');
var events_1 = require('events');
var chai_1 = require('chai');
var io = new events_1.EventEmitter();
var data = {
    _id: '1',
    str_prop: 'string',
    num_prop: 1,
    bool_prop: false,
    child: {
        sth: '__1__'
    },
    child2: {
        child_child: {
            sth: '__2__'
        }
    },
    id: function () {
        return this._id;
    }
};
describe('Model', function () {
    it('get data by keypath', function (done) {
        var model = new model_1.Model(data);
        var ret;
        ret = model.get('str_prop');
        chai_1.assert(ret == data['str_prop']);
        ret = model.get('num_prop');
        chai_1.assert(ret == data['num_prop']);
        ret = model.get('bool_prop');
        chai_1.assert(ret == data['bool_prop']);
        ret = model.get('child');
        chai_1.assert(ret['sth'] == data['child']['sth']);
        ret = model.get('child.sth');
        chai_1.assert(ret == data['child']['sth']);
        ret = model.get('sth_not_exsit');
        chai_1.assert(ret == undefined);
        done();
    });
    it('change the get data', function (done) {
        var model = new model_1.Model(data);
        var ret;
        ret = model.get('child');
        chai_1.assert(ret['sth'] == data['child']['sth']);
        ret['sth'] = 'not_obj';
        chai_1.assert(ret['sth'] != data['child']['sth']);
        done();
    });
    it('get data of model self', function (done) {
        var model = new model_1.Model(data);
        var ret;
        ret = model.get();
        chai_1.assert(ret['id'] == data['id']);
        done();
    });
});
describe('Child Model', function () {
    it('get child model', function (done) {
        var model = new model_1.Model(data);
        var child = model.getModel('child');
        chai_1.assert(child != undefined);
        done();
    });
    it('get data from child model', function (done) {
        var model = new model_1.Model(data);
        var child = model.getModel('child');
        var ret1 = model.get('child.sth');
        var ret2 = child.get('sth');
        chai_1.assert(ret1 == ret2);
        done();
    });
    it('get child model from a child model', function (done) {
        var model = new model_1.Model(data);
        var child = model.getModel('child2');
        var child_child = child.getModel('child_child');
        chai_1.assert(child_child != undefined);
        done();
    });
    it('get data from a child\'s child model', function (done) {
        var model = new model_1.Model(data);
        var child = model.getModel('child2');
        var child_child = child.getModel('child_child');
        var ret1 = model.get('child2.child_child.sth');
        var ret2 = child_child.get('sth');
        chai_1.assert(ret1 == ret2);
        done();
    });
    it('get child model is a model self', function (done) {
        var model = new model_1.Model(data);
        var self = model.getModel();
        var ret1 = model.get('_id');
        var ret2 = self.get('_id');
        chai_1.assert(ret1 == ret2);
        done();
    });
    it('get child model is a child model self', function (done) {
        var model = new model_1.Model(data);
        var child = model.getModel('child');
        var self = child.getModel();
        var ret1 = child.get('sth');
        var ret2 = self.get('sth');
        chai_1.assert(ret1 == ret2);
        done();
    });
});
//# sourceMappingURL=model.test.js.map