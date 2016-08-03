import { Model } from './model';
export default class ModelContainer extends Model<any> {
    constructor(data: any);
    getModel(keypath?: string): Model<any>;
    add(m: Model<any>): void;
    remove(m: Model<any>): void;
    toJSON(): {
        id: any;
        className: string;
        data: any;
    };
}
