import * as _ from 'lodash'
import { BaseModel } from './baseModel'

export class ChildModel<T> extends BaseModel<T> {
  constructor(key?: string, parent?: BaseModel<any>) {
    super(null, key, parent);
  }
  
  /**
   * return a copy of specific keypath
   */
  get(keypath: string = ''): any {
    if (keypath == '') {
      return this.parent.get(this.key);
    }
    return this.parent.get(this.key + '.' + keypath);
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
}