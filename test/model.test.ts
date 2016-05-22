'use strict'
import { Model } from '../src/lib/model/model';
import * as sinon from 'sinon';
import { EventEmitter } from 'events';
import { assert } from 'chai';
var io = new EventEmitter();
var data = {
  id: '1',
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
  }
}
describe('Model', function(){
  it('get data by keypath', function(done){
    var model = new Model(data);
    var ret: any;
    ret = model.get('str_prop');
    assert(ret == data['str_prop']);
    ret = model.get('num_prop');
    assert(ret == data['num_prop']);
    ret = model.get('bool_prop');
    assert(ret == data['bool_prop']);
    ret = model.get('child');
    assert(ret['sth'] == data['child']['sth']);
    ret = model.get('child.sth');
    assert(ret == data['child']['sth']);
    ret = model.get('sth_not_exsit');
    assert(ret == undefined);
    done();
  });
  it('change the get data', function(done){
    var model = new Model(data);
    var ret: any;
    ret = model.get('child');
    assert(ret['sth'] == data['child']['sth']);
    ret['sth'] = 'not_obj';
    assert(ret['sth'] != data['child']['sth']);
    done();
  });
  it('get data of model self', function(done){
    var model = new Model(data);
    var ret: any;
    ret = model.get();
    assert(ret['id'] == data['id']);
    done();
  });
});
describe('Child Model', function(){
  it('get child model', function(done){
    var model = new Model(data);
    var child = model.getModel('child');
    assert(child != undefined);
    done();
  });
  it('get data from child model', function(done){
    var model = new Model(data);
    var child = model.getModel('child');
    var ret1 = model.get('child.sth');
    var ret2 = child.get('sth');
    assert(ret1 == ret2);
    done();
  });
  it('get child model from a child model', function(done){
    var model = new Model(data);
    var child = model.getModel('child2');
    var child_child = child.getModel('child_child');
    assert(child_child != undefined);
    done();
  });
  it('get data from a child\'s child model', function(done){
    var model = new Model(data);
    var child = model.getModel('child2');
    var child_child = child.getModel('child_child');
    var ret1 = model.get('child2.child_child.sth');
    var ret2 = child_child.get('sth');
    assert(ret1 == ret2);
    done();
  });
  it('get child model is a model self', function(done){
    var model = new Model(data);
    var self = model.getModel();
    var ret1 = model.get('id');
    var ret2 = self.get('id');
    assert(ret1 == ret2);
    done();
  });
  it('get child model is a child model self', function(done){
    var model = new Model(data);
    var child = model.getModel('child');
    var self = child.getModel();
    var ret1 = child.get('sth');
    var ret2 = self.get('sth');
    assert(ret1 == ret2);
    done();
  });
});