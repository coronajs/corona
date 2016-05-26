'use strict'
import { ExamAdapter } from './fakeData/exam/adapter';
import { TExam } from './fakeData/exam/database';
import * as sinon from 'sinon';
import { EventEmitter } from 'events';
import { assert } from 'chai';
import * as _ from 'lodash';

describe('Adapter', function(){
  it('count', function(done){
    var data = _.cloneDeep(TExam);
    var adp = new ExamAdapter(data);
    adp.count({
      sex: 'female'
    }).then(count => {
      assert(count == data.filter(v => v.sex == 'female').length);
      done();
    })
  });
  it('find', function(done){
    var data = _.cloneDeep(TExam);
    var adp = new ExamAdapter(data);
    adp.find({
      lastName: 'Ren',
      firstName: 'Jian',
    }).then(matches => {
      assert(matches.length == data.filter(v => v.lastName == 'Ren' && v.firstName == 'Jian').length);
      done();
    });
  });
  it('findOne', function(done){
    var data = _.cloneDeep(TExam);
    var adp = new ExamAdapter(data);
    adp.findOne({
      sex: 'male'
    }).then(match => {
      assert(match != null);
      done();
    });
  });
  it('findOne not exsit', function(done){
    var data = _.cloneDeep(TExam);
    var adp = new ExamAdapter(data);
    adp.findOne({
      lastName: 'Xu'
    }).then(match => {
      assert(match == null);
      done();
    });
  });
  it('update', function(done){
    var data = _.cloneDeep(TExam);
    var adp = new ExamAdapter(data);
    adp.update({
      sex: 'male'
    }, {
      score: 100
    }).then(success => {
      assert(success);
      assert(data.filter(v => v.sex == 'male').length == data.filter(v => v.score == 100).length);
      done();
    });
  });
  it('remove', function(done){
    var data = _.cloneDeep(TExam);
    var adp = new ExamAdapter(data);
    adp.remove({
      sex: 'male'
    }).then(count => {
      assert(count == TExam.filter(v => v.sex == 'male').length);
      assert(data.length == TExam.length - count);
      done();
    });
  });
  it('insert', function(done){
    var data = _.cloneDeep(TExam);
    var adp = new ExamAdapter(data);
    adp.insert({
      firstName: 'Xiaomeng',
      middleName: '',
      lastName: 'Xu',
      sex: 'male',
      score: 100
    }).then(newRecord => {
      assert(newRecord.id);
      assert(TExam.length == data.length - 1);
      done();
    });
  });
  it('get by id', function(done){
    var data = _.cloneDeep(TExam);
    var adp = new ExamAdapter(data);
    adp.get(7).then(record => {
      assert(record.id);
      done();
    });
  });
});