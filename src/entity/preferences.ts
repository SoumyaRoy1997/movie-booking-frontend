import { payment } from './payment';

export interface preferences{
    genre: Array<string>;
    language:  Array<string>;
    theatre: Array<string>;
    savedPayments:Array<payment>;
}
