import {IAdapter} from '../adapter'
import * as _ from 'lodash'
import * as Promise from 'bluebird'

export default class InMemoryAdapter<T> implements IAdapter<T> {
  private db: { [id: string]: any, [index: number]: any } = {};
  
  get(id: string | number): PromiseLike<T> {
    return Promise.resolve(this.db[id]);
  }
  /**
   * insert a record
   */
  insert(record: T): PromiseLike<T> {
    this.db[record['id']] = record;
    return Promise.resolve(record)
  }
  /**
   * get number of matches for the query
   */
  count(query: Function, options?): PromiseLike<number> {
    return Promise.resolve(_.reduce(this.db, (sum, rec) => sum + query(rec) ? 1 : 0, 0));
  }
  // bulkInsert(record:T[]):PromiseLike<T[]>;
  /**
   * find out all the matched records
   */
  find(query, option?): PromiseLike<T[]> {
    return Promise.resolve(_.filter(this.db, query));
  }
  /**
   * find the first matched record
   */
  findOne(query, option?): PromiseLike<T> {
    return Promise.resolve(_.find(this.db, query))
  }
  /**
   * update all the matched records
   */
  update(query, operations, options?): PromiseLike<number> {
    let count = 0;
    _.forEach(this.db, (rec, id) => {
      if (query(rec)) {
        this.db[id] = operations(rec);
        count++
      }
    })
    return Promise.resolve(count)
  }
  /**
   * remove all the matched records
   */
  remove(query, options?): PromiseLike<number> {
    let count = _.size(this.db);
    this.db = _.reject(this.db, query);
    return Promise.resolve(count - _.size(this.db));
  }
} 