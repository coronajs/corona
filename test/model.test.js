'use strict'
var Model = require('../tsdist/lib/model').Model;
var sinon = require('sinon')
var EventEmitter = require('events').EventEmitter
var io = new EventEmitter();
var assert = require('chai').assert;
// class DummyController {
//   constructor(socket){
//     this.socket = socket;
//   }
//   init(params){

//   }
// }
describe('Model', function(){
  it('handles connection', function(done){
    // var server = new Server(io, {'/test/:id' : DummyController});
    // var callback = sinon.spy();
    // DummyController.prototype.init = callback;
    // var mockconn = {
    //   handshake:{
    //     url: 'http://localhost/test/:id'
    //   }
    // }
    // io.emit('connection', mockconn);
    // setImmediate(() => {
    //   assert( callback.called);
    //   done();
    // })
  })
})
