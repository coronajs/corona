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


export class RedisAdapter<T> implements IAdapter<T> {
  private redis:any;
  constructor(){
    this.redis = null;
  }
  get(key:string):T{
    return
  }
  
  set(key:string, value:T){
    return this;
  }
}
