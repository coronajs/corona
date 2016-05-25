import { EventEmitter } from 'events';
import * as _ from 'lodash'

export class BaseModel<T> extends EventEmitter {
  protected data: T;
  protected key: string;
  protected children: Array<BaseModel<any>>;
  protected parent: BaseModel<any>;
  protected root: BaseModel<any>;
  protected presisted: boolean = true;
  protected changed: boolean = false;
  protected primaryKey: string | number = '_id';

  constructor(data: T, key?: string, parent?: BaseModel<any>) {
    super();
    this.data = data;
    this.key = key || '';
    this.children = [];
    this.parent = parent;
    if (parent) {
      this.root = parent.root;
    } else {
      this.root = this;
    }
  }

  /**
   * return a copy of specific keypath
   */
  get(keypath: string): any {
    throw new Error('Not implemented');
  }

  /**
   * return a new child model which corresponding keypath
   */
  getModel(keypath: string): BaseModel<any> {
    throw new Error('Not implemented');
  }

  /**
   * set value
   */
  set(keypath: string, value: any) {
    throw new Error('Not implemented');
  }

  /**
   * retrieve value, and if not exists then invoke callback to calculate value
   * and save to the keypath
   */
  fetch(keypath: string, missing: () => any) {
    throw new Error('Not implemented');
  }

  valueOf(): T {
    return _.cloneDeep(this.data);
  }

  toString(): string {
    return this.data.toString();
  }

  get id() {
    return this.data[this.primaryKey];
  }
  
  set id(newValue){
    if(!this.data[this.primaryKey])
      this.data[this.primaryKey] = newValue
  }

  dispose() {
    this.emit('dispose');
  }
}
