import {IModel} from './baseModel'
import {Model} from './model'
import {mapValues} from 'lodash'

export default class ModelContainer<M extends IModel<any>> extends Model<any>{
  constructor(data: any) {
    if (data instanceof Array) {
      let d = data;
      data = {}
      d.forEach(e => {
        data[e.id] = e;
      })
    }
    super(data);
  }
  
  getModel(keypath:string = ''):M|this{
    if(keypath == ''){
      return this;
    }
    
    var keys = keypath.split('.')
    let i = keys.shift();
    
    if(keys.length == 0){
      return this.data[i];
    } else {
      return this.data[i].getModel(keys.join('.'))
    }
  }
  
  add(m: M) {
    this.data[m.id] = m;
    this.emit('add', m.id, m.toJSON());
  }

  remove(m: M) {
    delete this.data[m.id];
    this.emit('remove', m.id);
  }

  toJSON() {
    return {
      id: null,
      className: "ModelContainer",
      data: mapValues(this.data, m => m.toJSON())
    }
  }
}