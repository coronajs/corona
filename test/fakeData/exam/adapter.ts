import { FakeMemoryAdapter } from './../../fakeAdapter/FakeMemoryAdapter'
import { IExam } from './database'

export class ExamAdapter extends FakeMemoryAdapter<IExam> {
  constructor(data: IExam[]) {
    super();
    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      this.data[d.id] = d;
    }
  }
}