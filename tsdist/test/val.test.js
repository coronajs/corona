'use strict';
var objectID_1 = require('../src/lib/val/objectID');
var events_1 = require('events');
var chai_1 = require('chai');
var io = new events_1.EventEmitter();
describe('ObjectId', function () {
    it('create id', function (done) {
        var id = new objectID_1.ObjectId();
        chai_1.assert.typeOf(id.id, 'string');
        chai_1.assert.lengthOf(id.id, 12);
        done();
    });
    it('hex id string', function (done) {
        var id = new objectID_1.ObjectId();
        var hex = id.toHexString();
        chai_1.assert.lengthOf(hex, 24);
        done();
    });
    it('create id with hex', function (done) {
        var id = new objectID_1.ObjectId();
        var hex = id.toHexString();
        var id2 = new objectID_1.ObjectId(hex);
        chai_1.assert(id.id == id2.id);
        done();
    });
});
//# sourceMappingURL=val.test.js.map