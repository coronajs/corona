import {Model} from './model'
/**
 * ArrayModel represent a list of model object
 * this will emit length change events
 */
export default class ArrayModel<ElementType> extends Model<Array<ElementType>>{
  /*
   */
  constructor(data: Array<ElementType>){
    super(data);
  }

  push(element: ElementType): number {
    this.emit('push', element);
    this.emit('change', 'length', this.data.length);
    return this.data.length;
  }

  pop(): ElementType
  {
    var el = this.data.pop();
    this.emit('change', 'length', this.data.length);
    this.emit('pop', el);
    return el;
  }

  shift(): ElementType
  {
    var m = this.data.shift();
    this.emit('shift', m)
    return m;
  }

  unshift(el: ElementType): number
  {
    this.data.unshift(el);
    this.emit('unshift', el)
    return this.data.length;
  }

  splice(index: number, count: number)
  {
    return this.splice(index, count);
  }

  /**
   * slice a part of continous element in array
   */
  slice() /* : Slice */
  {

  }
}
