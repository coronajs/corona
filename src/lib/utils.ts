
/**
 * slice a part of continuos elements in an Array
 */
export class Slice<T> implements ArrayLike<T> {
    constructor(private array: ArrayLike<T>, private start: number, private end: number) {

    }

    valueOf() {
        return this.array.slice(this.start, this.end);
    }

    get length() {
        return this.end - this.start;
    }

    toString():string {
        return this.valueOf().toString();
    }
    
    [n: number]: T
}