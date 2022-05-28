import { showBookings } from './showBookings';

export interface showTimmings{
    id:string;
    timmings:string;
    showBookings:showBookings[];
    cost:number;
}