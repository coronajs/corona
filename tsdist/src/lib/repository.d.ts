import { EventEmitter } from 'events';
import { BaseModel } from './model/baseModel';
import ModelContainer from './model/ModelContainer';
import { IAdapter } from './adapter';
/**
 * Repository is used for storing and retrieving Models
 * E entity type
 * T Model type
 */
export declare class Repository<E, M extends BaseModel<E>> extends EventEmitter {
    modelClass: new (entity: E) => M;
    protected adapter: IAdapter<E>;
    /**
     * keep models in memory and unique
     */
    private identityMap;
    constructor(modelClass: new (entity: E) => M, adapter?: IAdapter<E>);
    /**
     * retrieve a model
     * if model exists in identity map then return from identity map
     * if model does not exist in identity map then create the model and store in identity map
     */
    retrieve(key: any): PromiseLike<M>;
    /**
     * store a model
     */
    store(model: M): PromiseLike<M>;
    /**
     *
     */
    create(entity: E): PromiseLike<M>;
    /**
     * remove a model from memory
     */
    remove(key: string): void;
    fetch(key: string, missing: () => M): PromiseLike<M>;
    private container;
    toModel(): ModelContainer;
}
