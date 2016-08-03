/**
 * Fake data simulate SQL Table
 */
export interface IExam {
    id?: number;
    firstName: string;
    middleName: string;
    lastName: string;
    sex: 'male' | 'female';
    score: number;
}
export declare const TExam: IExam[];
