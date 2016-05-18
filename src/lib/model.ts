import {EventEmitter} from 'events';

export class Model  extends EventEmitter {
  constructor(data, key, parent){
    super();
    this.data = data;
    this.key = key;
    this.children = [];
    this.parent = parent;
    this.root = parent.root;
  }
}

export class ArrayModel/*<ModelType extends Model>*/ extends Model {
  constructor(){

  }
}
