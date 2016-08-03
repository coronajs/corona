import { Model } from './model';
/**
 * ArrayModel represent a list of model object
 * this will emit length change events
 */
export default class ArrayModel<ElementType> extends Model<Array<ElementType>> {
    constructor(data: Array<ElementType>);
    getObject(index: number): ElementType;
    length: number;
    push(element: ElementType): number;
    pop(): ElementType;
    shift(): ElementType;
    unshift(el: ElementType): number;
    splice(index: number, count: number): any;
    /**
     * slice a part of continous element in array
     */
    slice(): void;
}
