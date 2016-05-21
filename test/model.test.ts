'use strict'
import { Model } from '../src/lib/model/model';
import { ObjectId } from '../src/lib/val/objectID';
import * as sinon from 'sinon';
import { EventEmitter } from 'events';
import { assert } from 'chai';
var io = new EventEmitter();
// class DummyController {
//   constructor(socket){
//     this.socket = socket;
//   }
//   init(params){

//   }
// }
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
})
// describe('Model', function(){
//   it('handles connection', function(done){
//     // var server = new Server(io, {'/test/:id' : DummyController});
//     // var callback = sinon.spy();
//     // DummyController.prototype.init = callback;
//     // var mockconn = {
//     //   handshake:{
//     //     url: 'http://localhost/test/:id'
//     //   }
//     // }
//     // io.emit('connection', mockconn);
//     // setImmediate(() => {
//     //   assert( callback.called);
//     //   done();
//     // })
//   })
// })
