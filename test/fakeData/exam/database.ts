/**
 * Fake data simulate SQL Table
 */

export interface IExam {
  id?: number,
  firstName: string,
  middleName: string,
  lastName: string,
  sex: 'male' | 'female',
  score: number
}

export const TExam: IExam[] = [
  { id: 1, firstName: 'Bill', middleName: '', lastName: 'Gate', sex: 'male', score: 87 },
  { id: 2, firstName: 'Steve', middleName: '', lastName: 'Jobs', sex: 'male', score: 85 },
  { id: 3, firstName: 'George', middleName: 'Raymond Richard', lastName: 'Martin', sex: 'male', score: 74 },
  { id: 4, firstName: 'Ludwig', middleName: 'van', lastName: 'Beethoven', sex: 'male', score: 91 },
  { id: 5, firstName: 'Leonardo', middleName: 'Di Serpiero Da', lastName: 'Vinci', sex: 'male', score: 95 },
  { id: 6, firstName: 'Michelangelo', middleName: 'di Lodovico', lastName: 'Buonarroti', sex: 'male', score: 93 },
  { id: 7, firstName: 'Jian', middleName: '', lastName: 'Ren', sex: 'female', score: 35 },
  { id: 8, firstName: 'Sola', middleName: '', lastName: 'Aoi', sex: 'male', score: 76 },
  { id: 9, firstName: 'Tony', middleName: '', lastName: 'Stark', sex: 'male', score: 99 },
]