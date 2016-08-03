import { BaseModel } from './baseModel';
/**
 * Models wraps entity object and provides extra events and syncing behavior
 */
export declare class Model<T> extends BaseModel<T> {
    constructor(data: T, key?: string, parent?: Model<any>);
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
     * TODO: 当 value 是一个 plain object 的时候，进行合并
     */
    set(keypath: string, value: any): void;
    /**
     * retrieve value, and if not exists then invoke callback to calculate value
     * and save to the keypath
     */
    fetch(keypath: string, missing: () => any): any;
    toJSON(): {
        id: any;
        className: string;
        data: T;
    };
}
