type Query = Array<any>;

/**
 * database adapter interface for retrieve entities
 */
export interface IAdapter<T> {
  /**
   * insert a record
   */
  insert(record: T): PromiseLike<T>;
  /**
   * get number of matches for the query
   */
  count(query, options?): PromiseLike<number>;
  // bulkInsert(record:T[]):PromiseLike<T[]>;
  get(id:any): PromiseLike<T>;
  /**
   * find out all the matched records
   */
  find(query, option?): PromiseLike<T[]>;
  /**
   * find the first matched record
   */
  findOne(query, option?): PromiseLike<T>;
  /**
   * update all the matched records
   */
  update(query, operations, options?): PromiseLike<number>;
  /**
   * remove all the matched records
   */
  remove(query, options?): PromiseLike<number>;
}