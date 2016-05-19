import {EventEmitter} from 'events'
import {Model} from './model'
import {IAdapter} from './adapter'


/**
 * Repository is used for storing and retrieving Models
 */
export class Repository<E, T extends Model<E>> extends EventEmitter {
  private identityMap: { [id: string]: E } = {};
  constructor(protected adapter: IAdapter<E>, public factory: (entity: E) => T) {
    super();
  }

  get(key: string): PromiseLike<T> {
    // if(this.identityMap[key]) return Promise.resolve(this.identityMap[key]);
    return this.adapter.findOne(key).then((entity) => this.factory(entity));
  }

  set(key: string, value: T): PromiseLike<boolean> {
    // if(changes){
    this.emit('update', key, value);
    return this.adapter.save(value.valueOf());
    // }
  }

  remove(key: string) {
    this.emit("delete", key)
  }

  fetch(key: string, missing: () => T): PromiseLike<T> {
    return this.get(key).then((value) => {
      if (!value) {
        value = missing();
        this.set(key, value);
      }
      return value;
    });

  }
}


/**
 *
 */
class DictRepository {

}

/**
 *
 */
class TableRepository {

}
