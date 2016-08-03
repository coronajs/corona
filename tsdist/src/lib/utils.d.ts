/**
 * slice a part of continuos elements in an Array
 */
export declare class Slice<T> implements ArrayLike<T> {
    private array;
    private start;
    private end;
    constructor(array: ArrayLike<T>, start: number, end: number);
    valueOf(): any;
    length: number;
    toString(): string;
    [n: number]: T;
}
