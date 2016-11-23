import { EventEmitter } from 'events';
import * as _ from 'lodash'

export interface IModel<T> extends EventEmitter{
  key:string;
  isRoot: boolean;

  get(keypath?:string):any;
  getModel(keypath?:string):this|ChildModel;
  set(keypath:string, value:any);
  change(keypath:string, cb:(value:any) => any):this;
  change(cb:(value:any) => any):this;
  // changeAsync(keypath:string, cb:(value:any) => PromiseLike<any>)
  fetch(keypath: string, missing: () => any);
  valueOf():T;
  dispose();
}

export class RootModel<T> extends EventEmitter implements IModel<T>{
  public readonly key:string;
  protected data: T;
  public readonly isRoot = true;
  protected children: {[keypath:string]:ChildModel} = {};
  protected presisted: boolean = true;
  protected changed: boolean = false;
  public primaryKey: string = '_id';

  constructor(data: T) {
    super();
    this.key = ''
    this.data = data;
  }

  /**
   * return a copy of specific keypath
   */
  get(keypath: string = ''): any {
    throw new Error('Not implemented');
  }

  /**
   * return a new child model which corresponding keypath
   */
  getModel(keypath: string = ''): ChildModel | this {
    if (keypath === '') {
      return this;
    }
    if (this.children[keypath]) {
      return this.children[keypath];
    }
    let m = new ChildModel(keypath, this);
    this.children[keypath] = m;
    return m;
  }

  /**
   * e.g. m.change('field', v => v + 1);
   */
  change(keypath, cb?):this{
    if (typeof keypath === 'function') {
      cb = keypath;
      keypath = '';
    }
    this.set(keypath, cb(this.get(keypath)));
    return this;
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

  private isDisposed:boolean = false;

  dispose() {
    if(!this.isDisposed){
      this.emit('dispose', this);
      this.isDisposed = true;
    }
  }
}



export class ChildModel implements IModel<any> {
  public readonly key: string;
  public readonly root: RootModel<any>
  protected parent: BaseModel<any>;
  
  constructor(key?: string, root?: RootModel<any>) {
    this.key = key;
    this.root = root;    
  }

  joinKeypath(path:string):string{
    return `${this.key}.${path}`;
  }
  /**
   * return a copy of specific keypath
   */
  get(keypath: string = ''): any {
    return this.root.get(this.joinKeypath(keypath) );
  }

  /**
   *
   */
  set(keypath: string, value: any): this {
    this.root.set(this.joinKeypath(keypath), value);
    return this;
  }

  /**
   * return a new child model which corresponding keypath
   */
  getModel(keypath: string = ''): ChildModel {
    if (keypath == '') {
      return this;
    }
    return this.root.getModel(this.joinKeypath(keypath)) as ChildModel;
  }
}


export class BaseModel<T> extends EventEmitter implements IModel<T>{
  protected data: T;

  protected children: Array<BaseModel<any>>;
  protected presisted: boolean = true;
  protected changed: boolean = false;
  public primaryKey: string = '_id';

  constructor(data: T) {
    super();
    this.data = data;
    this.children = [];
  }

  /**
   * return a copy of specific keypath
   */
  get(keypath: string = ''): any {
    throw new Error('Not implemented');
  }

  /**
   * return a new child model which corresponding keypath
   */
  getModel(keypath: string = ''): BaseModel<any> {
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

  private isDisposed:boolean = false;

  dispose() {
    if(!this.isDisposed){
      this.emit('dispose', this);
      this.isDisposed = true;
    }
  }
}
