import { IAdapter } from '../../src/lib/adapter';
export declare class FakeMemoryAdapter<T> implements IAdapter<T> {
    protected datasource: any;
    data: {
        [index: number]: T;
    };
    constructor(datasource: any);
    protected _findMatchKeys(query: any): string[];
    /**
     * get number of matches for the query
     */
    count(query: any): PromiseLike<number>;
    /**
     * find out all the matched records
     */
    find(query: any, option?: any): PromiseLike<T[]>;
    /**
     * find the first matched record
     */
    findOne(query: any, option?: any): PromiseLike<T>;
    /**
     * update all the matched records
     */
    update(query: any, updates: any): PromiseLike<number>;
    /**
     * remove all the matched records
     */
    remove(query: any): PromiseLike<number>;
    /**
     * insert a record
     */
    insert(record: T): PromiseLike<T>;
    get(id: any): PromiseLike<T>;
}
