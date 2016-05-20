import {EventEmitter} from 'events';
import * as _ from 'lodash'
/**
 * Models wraps entity object and provides extra events and syncing behavior
 */
export class Model<T> extends EventEmitter {
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

  /**
   * return a copy of specific keypath
   */
  get(keypath:string):any{
    return
  }
  
  /**
   * return a new model which corresponding keypath 
   */
  getModel(keypath:string):Model<any>{
    return
  }

  /**
   * set value
   */
  set(keypath:string, value:any){

  }
  
  /**
   * retrieve value, and if not exists then invoke callback to calculate value
   * and save to the keypath
   */
  fetch(keypath:string, missing: () => any){

  }

  valueOf():T{
    return _.clone(this.data);
  }

  toString():string{
    return this.data.toString();
  }
  
  get id(){
    return this.data.id;
  }
}

// export type BaseModel = Model<any>

/**
 * ArrayModel represent a list of model object
 * this will emit length change events
 */
export class ArrayModel<ElementType, ModelType extends Model<ElementType>> extends Model<Array<ModelType>>{
  /*
   */
  constructor(data: Array<ElementType>, private modelContructor: new(data:ElementType) => ModelType){
    super(data.map(e => new modelContructor(e)));
  }

  push(element: ModelType): number {
    this.emit('push', element);
    this.emit('update', 'length', this.data.length);
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

export class ChildModel<T> extends Model<T> {
  constructor(data:T){
    super(data);
  }
}

/**
 *
 */
// export class SliceModel extends ArrayModel {

// }
