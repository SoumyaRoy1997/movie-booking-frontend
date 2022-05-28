import { Location } from './location';
import { Facilities } from './facilities';
import { Events } from './events';
import { Screens } from './screens';

export interface Theatres{
id:string;
theatreName:string;
noOfScreens:number;
location:Location;
facilities:Facilities;
events:Events;
screens:Screens[];
}