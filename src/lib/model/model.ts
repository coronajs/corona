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
      return _.cloneDeep(this.data);
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
    return _.cloneDeep(ret);
  }

  /**
   * return a new child model which corresponding keypath
   */
  getModel(keypath: string = ''): BaseModel<any> {
    if (keypath == '') {
      return this;
    }
    let m = new ChildModel(keypath, this);
    this.children[keypath] = m;
    return m;
  }

  /**
   * set value
   * TODO: 当 value 是一个 plain object 的时候，进行合并
   */
  set(keypath: string, value: any) {
    if (!keypath || keypath === '') {
      this.data = value;
      return;
    }

    let keypaths = keypath.split('.')
    let ret = this.data;
    let last = keypaths.pop();

    keypaths.forEach((p) => {
      if(!ret[p]){
        ret[p] = {}
      }
      ret = ret[p];
    });

    if(ret[last] !== value){
      this.emit('change', keypath, value, ret[last])
      ret[last] = value;
    }
  }

  /**
   * retrieve value, and if not exists then invoke callback to calculate value
   * and save to the keypath
   */
  fetch(keypath: string, missing: () => any) {
    let v = this.get(keypath);
    if(!v){
      v = missing();
      this.set(keypath, v);
    }
    return v;
  }
  
  
  toJSON() {
    return {
      className: 'Model',
      data: this.data
    }
  }
}


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
