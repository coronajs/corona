import {EventEmitter} from 'events'
import {Model} from './model'
import {IAdapter} from './adapter'


/**
 * Repository is used for storing and retrieving Models
 */
export class Repository<E, T extends Model<E> > extends EventEmitter {
  private adapter:IAdapter<E>;
  private identityMap:Map = new Map();
  constructor(){
    super();
    this.adapter = null
  }

  get(key:string):T{
    // if(this.identityMap)
    return new T(this.adapter.get(key));
  }

  set(key:string, value:T){
    // if(changes){
      this.emit('update', key, value);
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
