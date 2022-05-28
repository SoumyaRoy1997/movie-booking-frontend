import { preferences } from './preferences';
import { bookings } from './bookings';
import { Binary } from '@angular/compiler';

export interface users{
    username: string;
    password: string;
    rolemap: string;
    firstName?:string;
    lastName?:string;
    profilePic?:Binary;
    preferences?: preferences;
    bookings?: Array<string>;
    id?:string;
}
