import {IAdapter} from '../../src/lib/adapter'
import * as Promise from 'bluebird';
import * as _ from 'lodash';

export class FakeMemoryAdapter<T> implements IAdapter<T>{
  data: {
    [index: number]: T 
  } = {}
  constructor(protected datasource: any) {}
  protected _findMatchKeys(query): string[] {
    return Object.keys(this.data).filter(key => {
      var ret = true;
      for (var qk in query) {
        if (query.hasOwnProperty(qk)) {
          var q = query[qk];
          ret = ret && q == this.data[key][qk]
        }
      }
      return ret;
    });
  }
  /**
   * get number of matches for the query
   */
  count(query): PromiseLike<number> {
    var self = this;
    return new Promise<number>((resolve, reject) => {
      var count = self._findMatchKeys(query).length;
      resolve(count);
    });
  }
  // bulkInsert(record:T[]):PromiseLike<T[]>;
  /**
   * find out all the matched records
   */
  find(query, option?): PromiseLike<T[]> {
    var self = this;
    return new Promise<T[]>((resolve, reject) => {
      var keys = self._findMatchKeys(query);
      resolve(_.cloneDeep(keys.map(key => self.data[key])));
    });
  };
  /**
   * find the first matched record
   */
  findOne(query, option?): PromiseLike<T> {
    var self = this;
    return new Promise<T>((resolve, reject) => {
      for (var key in self.data) {
        if (self.data.hasOwnProperty(key)) {
          var ret = true;
          for (var qk in query) {
            if (query.hasOwnProperty(qk)) {
              var q = query[qk];
              ret = ret && q == self.data[key][qk]
            }
          }
          if (ret) {
            resolve(_.cloneDeep(self.data[key]));
            break;
          }
        }
      }
      resolve(null);
    });
  };
  /**
   * update all the matched records
   */
  update(query, updates): PromiseLike<boolean> {
    var self = this;
    return new Promise<boolean>((resolve, reject) => {
      var keys = self._findMatchKeys(query);
      keys.map(key => {
        var d = self.data[key];
        for (var update in updates) {
          if (updates.hasOwnProperty(update)) {
            d[update] = updates[update];
          }
        }
      })
      resolve(true);
    });
  };
  /**
   * remove all the matched records
   */
  remove(query): PromiseLike<number> {
    throw new Error('Not implemented');
  };
  /**
   * insert a record
   */
  insert(record: T): PromiseLike<T> {
    throw new Error('Not implemented');
  };
}