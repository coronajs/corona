
export class Adapter {

}

export class RedisAdapter extends RepositoryAdapter {
  constructor(){
    this.redis = null;
  }
}

/**
 * get and set models
 */
export class Repository/*<Model>*/ extends EventEmitter {
  constructor(){
    super();
    this.adapter = null
    this.identityMap = new Map();
  }

  get(key)/*:Model*/{
    if(this.identityMap)
    /* return new Model(this.adapter.get(key)) */
  }

  set(key, value/*:Model*/){
    if(changes){
      this.emit('update', key, value);
    }
  }

  remove(key){
    this.emit("delete", key)
  }

  fetch(key, missing)/*:Model*/{
    var value = this.get(key);
    if(!value){
      value = missing();
      this.set(key, value);
    }
    return value;
  }
}
