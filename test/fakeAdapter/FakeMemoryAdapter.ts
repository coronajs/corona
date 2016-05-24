import {IAdapter} from '../../src/lib/adapter'
import * as Promise from 'bluebird';

export class FakeMemoryAdapter<T> implements IAdapter<T>{
  data: {
    [id: string]: T,
    [index: number]: T 
  } = {}
  /**
   * insert a record
   */
  insert(record: T): PromiseLike<T> {
    throw new Error('Not implemented');
  };
  /**
   * get number of matches for the query
   */
  count(query): PromiseLike<number> {
    var self = this;
    return new Promise<number>((resole, reject) => {
      var count = Object.keys(self.data).filter(key => {
        var ret = true;
        for (var qk in query) {
          if (query.hasOwnProperty(qk)) {
            var q = query[qk];
            ret = ret && q == self.data[key][qk]
          }
        }
        return ret;
      }).length;
      resole(count);
    });
  }
  // bulkInsert(record:T[]):PromiseLike<T[]>;
  /**
   * find out all the matched records
   */
  find(query, option?): PromiseLike<T[]> {
    throw new Error('Not implemented');
  };
  /**
   * find the first matched record
   */
  findOne(query, option?): PromiseLike<T> {
    throw new Error('Not implemented');
  };
  /**
   * update all the matched records
   */
  update(query, operations, options?): PromiseLike<boolean> {
    throw new Error('Not implemented');
  };
  /**
   * remove all the matched records
   */
  remove(query, options?): PromiseLike<number> {
    throw new Error('Not implemented');
  };
}