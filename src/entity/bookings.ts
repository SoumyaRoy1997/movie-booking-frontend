import { payment } from './payment';

export interface bookings{
userID: string;
theatreID: string;
movieID: string;
screenID:string,
timmingID:string,
price: number;
noOfTickets: number;
bookingDate: Date;
payment:payment;
response?:bookingResponse
}
export interface bookingResponse{
    movieName:string;
	theatreName:string;
	theatreAddress:Location;
    time:string;
    poster:string;
}