export declare class ObjectId {
    id: string;
    constructor(id?: string);
    generate(): string;
    get_inc(): number;
    toHexString(): string;
    static index: number;
}
