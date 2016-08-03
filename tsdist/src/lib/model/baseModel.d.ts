import { EventEmitter } from 'events';
export declare class BaseModel<T> extends EventEmitter {
    protected data: T;
    protected key: string;
    protected children: Array<BaseModel<any>>;
    protected parent: BaseModel<any>;
    protected root: BaseModel<any>;
    protected presisted: boolean;
    protected changed: boolean;
    primaryKey: string;
    constructor(data: T, key?: string, parent?: BaseModel<any>);
    /**
     * return a copy of specific keypath
     */
    get(keypath?: string): any;
    /**
     * return a new child model which corresponding keypath
     */
    getModel(keypath?: string): BaseModel<any>;
    /**
     * set value
     */
    set(keypath: string, value: any): void;
    /**
     * retrieve value, and if not exists then invoke callback to calculate value
     * and save to the keypath
     */
    fetch(keypath: string, missing: () => any): void;
    valueOf(): T;
    toString(): string;
    id: any;
    private isDisposed;
    dispose(): void;
}
