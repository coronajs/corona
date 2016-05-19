import {EventEmitter} from 'events';
import * as _ from 'lodash'
/**
 * Models wraps entity object and provides extra events and syncing behavior
 */
export class Model <T> extends EventEmitter {
  protected data: T;
  private key: string;
  private children: Array<Model<any>>;
  private parent: Model<any>;
  private root: Model<any>;
  constructor(data:T, key?:string, parent?:Model<any>){
    super();
    this.data = data;
    this.key = key;
    this.children = [];
    this.parent = parent;
    this.root = parent.root;
  }

  get(key:string):any{

  }

  set(key:string, value:any){

  }

  fetch(key:string, missing: () => any){

  }

  valueOf():T{
    return _.clone(this.data);
  }

  toString():string{
    return this.data.toString();
  }
}

// export type BaseModel = Model<any>

/**
 * ArrayModel represent a list of model object
 * this will emit length change events
 */
export class ArrayModel<ElementType, ModelType extends Model<ElementType>> extends Model<Array<ElementType>>{
  /*
   */
  constructor(data: Array<ElementType> ){
    super(data);
  }

  push(element: ModelType): number {
    this.emit('push', element);
    this.emit('update', 'length', this.data.push(element));
    return this.data.length;
  }

  pop(): ElementType
  {
    var el = this.data.pop();
    this.emit('update', 'length', this.data.length);
    this.emit('pop', el);
    return el;
  }

  shift(): ElementType
  {
    this.emit('shift')
    return 
  }

  unshift(): number
  {
    this.emit('unshift')
    return this.data.length;
  }

  splice()
  {

  }

  /**
   * slice a part of continous element in array
   */
  slice() /* : Slice */
  {

  }
}


/**
 *
 */
// export class SliceModel extends ArrayModel {

// }
