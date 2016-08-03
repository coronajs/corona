/**
 * database adapter interface for retrieve entities
 */
export interface IAdapter<T> {
    /**
     * insert a record
     */
    insert(record: T): PromiseLike<T>;
    /**
     * get number of matches for the query
     */
    count(query: any, options?: any): PromiseLike<number>;
    get(id: any): PromiseLike<T>;
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
