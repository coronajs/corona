type Query = Array<any>;

/**
 * database adapter interface for retrieve entities
 */
export interface IAdapter<T> {
  create(record:T):PromiseLike<boolean>;
  insert(records:T[]):PromiseLike<boolean>;
  find(query):PromiseLike<T[]>;
  findOne(query):PromiseLike<T>;
  save(record:T):PromiseLike<boolean>;
  remove(query, options?):PromiseLike<number>;
}