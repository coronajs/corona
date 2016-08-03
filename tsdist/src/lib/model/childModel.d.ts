import { BaseModel } from './baseModel';
export declare class ChildModel extends BaseModel<any> {
    constructor(key?: string, parent?: BaseModel<any>);
    /**
     * return a copy of specific keypath
     */
    get(keypath?: string): any;
    joinKeypath(path: string): string;
    /**
     *
     */
    set(keypath: string, value: any): this;
    /**
     * return a new child model which corresponding keypath
     */
    getModel(keypath?: string): ChildModel;
}
