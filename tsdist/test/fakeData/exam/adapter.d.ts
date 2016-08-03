import { FakeMemoryAdapter } from './../../fakeAdapter/FakeMemoryAdapter';
import { IExam } from './database';
export declare class ExamAdapter extends FakeMemoryAdapter<IExam> {
    protected datasource: IExam[];
    constructor(datasource: IExam[]);
    /**
     * remove all the matched records
     */
    remove(query: any): PromiseLike<number>;
    /**
     * insert a record
     */
    insert(record: IExam): PromiseLike<IExam>;
    get(id: any): PromiseLike<IExam>;
}
