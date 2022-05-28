import { Shows } from './shows';
import { Theatres } from './theatres';

export interface Screens{
    id:string;
	theater_id:string;
	type:string;
	capacity:number;
    shows:Shows[];
    theatres?:Array<Theatres>;
}