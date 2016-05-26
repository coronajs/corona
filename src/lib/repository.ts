import {EventEmitter} from 'events'
import {BaseModel} from './model/baseModel'
import {IAdapter} from './adapter'
import InMemoryAdapter from './adapters/InMemoryAdapter'
import NullAdapter from './adapters/NullAdapter'
import * as Promise from 'bluebird';

/**
 * Repository is used for storing and retrieving Models
 * E entity type
 * T Model type
 */
export class Repository<E, M extends BaseModel<E>> extends EventEmitter {
  /**
   * keep models in memory and unique
   */
  private identityMap: {
    [id: string]: M,
    [index: number]: M
  } = {};
  constructor(
    public modelClass: new (entity: E) => M,
    protected adapter: IAdapter<E> = new NullAdapter<E>()
  ) {
    super();
  }

  /**
   * retrieve a model
   * if model exists in identity map then return from identity map
   * if model does not exist in identity map then create the model and store in identity map
   */
  retrieve(key: any): PromiseLike<M> {
    if (this.identityMap[key]) {
      return Promise.resolve(this.identityMap[key]);
    } else {
      return this.adapter.get(key).then((entity) => {
        let m = new this.modelClass(entity);
        this.identityMap[m.id] = m;
        return m;
      });
    }
  }


  /**
   * store a model
   */
  store(model: M): PromiseLike<M> {
    let primaryKey = model.primaryKey;
    if (model.id) {
      return this.adapter.update({ primaryKey: model.id }, model.valueOf()).then((data) => {
        return model
      });
    } else {
      return this.adapter.insert(model.valueOf()).then((rec) => {
        model.id = rec[primaryKey];
        return model;
      })
    }
  }
  
  /**
   * 
   */
  create(entity: E):PromiseLike<M>{
    return this.adapter.insert(entity).then((entity) => {
      let m = new this.modelClass(entity);
      this.identityMap[m.id] = m;
      return m;
    });
  }

  /**
   * remove a model from memory
   */
  remove(key: string) {
    let m = this.identityMap[key];
    delete this.identityMap[key];
    this.emit("delete", key, m);
    m.dispose();
  }
  
  // detach(m: M){
  //   if(this.identityMap[m.id]){
  //     delete this.identityMap[m.id];
  //     this.emit('detach', m.id, m);
  //   }
  // }

  fetch(key: string, missing: () => M): PromiseLike<M> {
    return this.retrieve(key).then((value) => {
      if (!value) {
        value = missing();
        this.store(value);
      }
      return value;
    });
  }

  /**
   * dispose
   */
}