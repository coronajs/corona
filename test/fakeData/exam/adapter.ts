import { FakeMemoryAdapter } from './../../fakeAdapter/FakeMemoryAdapter'
import { IExam } from './database'
import * as Promise from 'bluebird';
import * as _ from 'lodash';

export class ExamAdapter extends FakeMemoryAdapter<IExam> {
  constructor(protected datasource: IExam[]) {
    super(datasource);
    for (var i = 0; i < datasource.length; i++) {
      var d = datasource[i];
      this.data[d.id.toString()] = d;
    }
  }
  /**
   * remove all the matched records
   */
  remove(query): PromiseLike<number> {
    var self = this;
    return new Promise<number>((resolve, reject) => {
      var keys = self._findMatchKeys(query);
      keys.map(key => {
        var index = self.datasource.indexOf(self.data[key]);
        self.datasource.splice(index, 1);
        delete self.data[key];
      });
      resolve(keys.length);
    })
  };
  /**
   * insert a record
   */
  insert(record: IExam): PromiseLike<IExam> {
    var self = this;
    return new Promise<IExam>((resolve, reject) => {
      var id = _.maxBy(self.datasource, 'id')['id'] + 1;
      record.id = id;
      self.datasource.push(record);
      self.data[record.id.toString()] = record;
      resolve(record);
    });
  };
}