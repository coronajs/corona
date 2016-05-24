import * as _ from 'lodash'
import { BaseModel } from './baseModel'

export class ChildModel extends BaseModel<any> {
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
    return this.parent.get(this.joinKeypath(keypath) );
  }

  joinKeypath(path:string):string{
    return `${this.key}.${path}`;
  }
  /**
   *
   */
  set(keypath: string, value: any): this {
    this.parent.set(keypath, value);
    return this;
  }

  /**
   * return a new child model which corresponding keypath
   */
  getModel(keypath: string = ''): ChildModel {
    if (keypath == '') {
      return this;
    }
    return <ChildModel>this.parent.getModel(this.joinKeypath(keypath));
  }
}
