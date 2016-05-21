'use strict'
import { ObjectId } from '../src/lib/val/objectID';
import * as sinon from 'sinon';
import { EventEmitter } from 'events';
import { assert } from 'chai';
var io = new EventEmitter();
describe('ObjectId', () => {
  it('create id', (done) => {
    var id = new ObjectId();
    assert.typeOf(id.id, 'string');
    assert.lengthOf(id.id, 12);
    done();
  });
  it('hex id string', (done) => {
    var id = new ObjectId();
    var hex = id.toHexString();
    assert.lengthOf(hex, 24);
    done();
  });
  it('create id with hex', (done) => {
    var id = new ObjectId();
    var hex = id.toHexString();
    var id2 = new ObjectId(hex);
    assert(id.id == id2.id);
    done();
  })
});