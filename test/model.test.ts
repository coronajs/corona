'use strict'
import { Model } from '../src/lib/model/model';
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
