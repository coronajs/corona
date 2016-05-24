import {EventEmitter} from 'events';
import * as _ from 'lodash'
import { BaseModel } from './baseModel'
import { ChildModel } from './childModel'
/**
 * Models wraps entity object and provides extra events and syncing behavior
 */
export class Model<T> extends BaseModel<T> {

  constructor(data: T, key?: string, parent?: Model<any>) {
    super(data, key, parent);
  }
  
  /**
   * return a copy of specific keypath
   */
  get(keypath: string = ''): any {
    if (keypath == '') {
      return _.clone(this.data);
    }
    let keypaths = keypath.split('.');
    let ret: any = this.data;
    for (var i = 0; i < keypaths.length; i++) {
      keypath = keypaths[i];
      if (ret.hasOwnProperty(keypath)) {
        ret = ret[keypath];
      } else {
        return undefined;
      }
    }
    return _.clone(ret);
  }

  /**
   * return a new child model which corresponding keypath 
   */
  getModel(keypath: string = ''): ChildModel<any> {
    if (keypath == '') {
      return this;
    }
    let data = this.get(keypath);
    if (data != undefined) {
      return new ChildModel<typeof data>(keypath, this);
    }
    return null;
  }

  /**
   * set value
   */
  set(keypath: string, value: any) {

  }

  /**
   * retrieve value, and if not exists then invoke callback to calculate value
   * and save to the keypath
   */
  fetch(keypath: string, missing: () => any) {

  }

}

// export type BaseModel = Model<any>

/**
 * ArrayModel represent a list of model object
 * this will emit length change events
 */
// export class ArrayModel<ElementType, ModelType extends Model<ElementType>> extends Model<Array<ModelType>>{
//   /*
//    */
//   constructor(data: Array<ElementType>, private modelContructor: new(data:ElementType) => ModelType){
//     super(data.map(e => new modelContructor(e)));
//   }

//   push(element: ModelType): number {
//     this.emit('push', element);
//     this.emit('update', 'length', this.data.length);
//     return this.data.length;
//   }

//   pop(): ElementType
//   {
//     var el = this.data.pop();
//     this.emit('update', 'length', this.data.length);
//     this.emit('pop', el);
//     return el;
//   }

//   shift(): ElementType
//   {
//     this.emit('shift')
//     return 
//   }

//   unshift(): number
//   {
//     this.emit('unshift')
//     return this.data.length;
//   }

//   splice()
//   {

//   }

//   /**
//    * slice a part of continous element in array
//    */
//   slice() /* : Slice */
//   {

//   }
// }

// export class ChildModel<T> extends Model<T> {
//   constructor(data:T){
//     super(data);
//   }
// }

/**
 *
 */
// export class SliceModel extends ArrayModel {

// }
