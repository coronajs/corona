import {EventEmitter} from 'events'
import {Model} from './model'
import {IAdapter} from './adapter'


/**
 * Repository is used for storing and retrieving Models
 */
export class Repository<E, T extends Model<E> > extends EventEmitter {
  private adapter:IAdapter<E>;
  private identityMap:{[id:string]:E}={};
  public factory:(entity:E) => T;
  constructor(){
    super();
    this.adapter = null
  }

  get(key:string):PromiseLike<T>{
    // if(this.identityMap[key]) return this.identityMap[key];
    return this.adapter.findOne(key).then((entity) => this.factory(entity));
  }

  set(key:string, value:T):PromiseLike<boolean>{
    // if(changes){
      this.emit('update', key, value);
    return this.adapter.save(value.valueOf());
    // }
  }

  remove(key:string){
    this.emit("delete", key)
  }

  fetch(key:string, missing:() => T):T{
    var value = this.get(key);
    if(!value){
      value = missing();
      this.set(key, value);
    }
    return value;
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
