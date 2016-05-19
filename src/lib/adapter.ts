type Query = Array<any>;
/**
 * database adapter interface for retrieve entities
 */
export interface IAdapter<T> {
  get(key:string):T;
  set(key:string, value:T):this;
  create(record:T);
  insert(records:T[]);
  find(query):T[];
  delete(query);
}

export class Adapter {
  get(key:string){
    
  }
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
