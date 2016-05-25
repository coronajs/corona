import {IAdapter} from '../adapter'
import * as Promise from 'bluebird'
/**
 * NullAdapter won't persist any entity
 * Repository which uses NullAdapter will actually save model in repository's identity map;
 * NullAdapter will only assign id for entity
 */
export default class NullAdapter<T> implements IAdapter<T>{
  private seqId = 0;
  
  get(id: string | number): PromiseLike<T> {
    return 
  }
  
  /**
   * insert a record
   */
  insert(record: T): PromiseLike<T> {
    record['id'] = this.seqId++;
    return Promise.resolve(record);
  }
  /**
   * get number of matches for the query
   */
  count(query: Function, options?): PromiseLike<number> {
    return Promise.resolve(this.seqId);
  }
  // bulkInsert(record:T[]):PromiseLike<T[]>;
  /**
   * find out all the matched records
   */
  find(query, option?): PromiseLike<T[]> {
    return Promise.resolve([]);
  }
  /**
   * find the first matched record
   */
  findOne(query, option?): PromiseLike<T> {
    return Promise.resolve(null);
  }
  /**
   * update all the matched records
   */
  update(query, operations, options?): PromiseLike<number> {
    
    return Promise.resolve(0);
  }
  /**
   * remove all the matched records
   */
  remove(query, options?): PromiseLike<number> {
    return Promise.resolve(0);
  }  
  
}