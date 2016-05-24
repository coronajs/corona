'use strict'
import { ExamAdapter } from './fakeData/exam/adapter';
import { TExam } from './fakeData/exam/database';
import * as sinon from 'sinon';
import { EventEmitter } from 'events';
import { assert } from 'chai';
describe('Adapter', function(){
  it('count', function(done){
    var adp = new ExamAdapter(TExam);
    adp.count({
      sex: 'female'
    }).then(count => {
      assert(count == TExam.filter(v => v.sex == 'female').length);
      done();
    })
  });
});