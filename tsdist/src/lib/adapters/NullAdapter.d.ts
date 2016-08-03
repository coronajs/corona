import { IAdapter } from '../adapter';
/**
 * NullAdapter won't persist any entity
 * Repository which uses NullAdapter will actually save model in repository's identity map;
 * NullAdapter will only assign id for entity
 */
export default class NullAdapter<T> implements IAdapter<T> {
    private seqId;
    get(id: string | number): PromiseLike<T>;
    /**
     * insert a record
     */
    insert(record: T): PromiseLike<T>;
    /**
     * get number of matches for the query
     */
    count(query: Function, options?: any): PromiseLike<number>;
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
    update(query: any, operations: any, options?: any): PromiseLike<number>;
    /**
     * remove all the matched records
     */
    remove(query: any, options?: any): PromiseLike<number>;
}
