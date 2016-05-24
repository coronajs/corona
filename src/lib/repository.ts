import {EventEmitter} from 'events'
import {BaseModel} from './model/baseModel'
import {IAdapter} from './adapter'
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

  constructor(protected adapter: IAdapter<E>, public factory: (entity: E) => M) {
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
      return this.adapter.findOne(key).then((entity) => {
        let m = this.factory(entity);
        this.identityMap[m.id] = m;
        return m;
      });
    }
  }


  /**
   * store a model
   */
  store(model: M): PromiseLike<M> {
    if (model.id) {
      return this.adapter.update({ _id: model.id }, model.valueOf()).then((data) => model);
    } else {
      // return this.adapter.insert(model.valueOf()).then((rec) => )
    }
  }

  /**
   * delete a model
   */
  remove(key: string) {
    let m = this.identityMap[key];
    delete this.identityMap[key];
    this.emit("delete", key);
    m.dispose();
  }

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