import {EventEmitter} from 'events'
import {Model} from './model'
import {IAdapter} from './adapter'


/**
 * Repository is used for storing and retrieving Models
 * E entity type
 * T Model type
 */
export class Repository<E, T extends Model<E>> extends EventEmitter {

  /**
   * keep models in memory and unique
   */
  private identityMap: { [id: any]: E } = {};
  
  constructor(protected adapter: IAdapter<E>, public factory: (entity: E) => T) {
    super();
  }

  /**
   * retrieve a model
   */
  get(key: any): PromiseLike<T> {

    // if(this.identityMap[key]) return Promise.resolve(this.identityMap[key]);
    return this.adapter.findOne(key).then((entity) => this.factory(entity));
  }


  /**
   * store a model
   */
  save(model: T): PromiseLike<T> {
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
    delete this.identityMap[key];
    this.emit("delete", key)
  }

  fetch(key: string, missing: () => T): PromiseLike<T> {
    return this.get(key).then((value) => {
      if (!value) {
        value = missing();
        this.set(value);
      }
      return value;
    });
  }
  
  /**
   * dispose
   */
}