import { showTimmings } from './showTimmings';

export interface Shows{
    type:string;
	duration:string;
	showId:string;
	first_screening:Date;
	last_screening:Date;
	showTimings:showTimmings[];
}