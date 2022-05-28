import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { Theatres } from 'src/entity/theatres';
import { Shows } from 'src/entity/shows';
import { Screens } from 'src/entity/screens';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { showTimmings } from 'src/entity/showTimmings';
import { PaymentComponent } from 'src/payment/payment.component';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.scss'],
})
export class BookTicketsComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @Input()theatre : Theatres;
  @Input()screen : Screens;
  @Input()show : Shows;
  @Input()timmings : showTimmings;
  seatNo= ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P"
  ,"Q","R","S","T","U","V","W","X","Y","Z"];
  bookedSeats= new Array;
  seats;
  seatsDummy;
  rows;
  tickets=new Array<string>();
  book=false;
  ticket:string;
  disableBooking;
  modal=null;
  constructor(private modalctrl: ModalController,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) { this.matIconRegistry.addSvgIcon(
                'unbooked',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/unbooked-seat.svg')
              );this.matIconRegistry.addSvgIcon(
                'booked',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/booked-seat.svg')
              );this.matIconRegistry.addSvgIcon(
                'blocked',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/blocked-seat.svg')
              ); }

  ngOnInit() {
    this.seats= new Array<string>(this.screen.capacity);
    this.seatsDummy= new Array<string>(20);
    this.rows= new Array<string>(10);
    this.disableBooking= new Array<boolean>(this.screen.capacity);
    this.timmings.showBookings.forEach(element => {
      this.bookedSeats.push(element.seat);
    });

    for (let index = 0; index < this.seats.length; index++) {
      this.seats[index]="unbooked";
      this.disableBooking[index]=false;
      for(let j=0;j<this.bookedSeats.length;j++){
        if(this.bookedSeats[j].substring(1,this.bookedSeats[j].length)===((index+1).toString())){
          this.seats[index]="blocked";
          this.disableBooking[index]=true;
          break;
        }
      }
    }
    console.log(this.seats);
  }
  bookSeat(i:number,seat:string){
    const seatNo=seat+(i+1);
    if(this.seats[i]==="booked"){
      this.seats[i]="unbooked";
      this.tickets=this.tickets.filter(ticket=>
        ticket.substring(1,ticket.length) !== (i+1).toString()
      );
      if(this.tickets.length == 0)
      this.book=false;
    }
    else{
      this.book=true;
      this.seats[i]="booked";
      this.tickets.push(seatNo);
    }
    this.ticket=this.tickets.length + " Tickets";
  }
  
  dismissModal() {
    this.modalctrl.dismiss({
      'dismissed': true
    });
  }
  async payment(){
    this.dismissModal();
    let cost:number=0;
    cost=(this.tickets.length) * (this.timmings.cost);
    console.log(cost);
    this.modal = await this.modalctrl.create({
      component: PaymentComponent,
      componentProps:{
        tickets:this.tickets,
        theatre:this.theatre,
        screen:this.screen,
        show:this.show,
        timmings:this.timmings,
        cost
      },
      swipeToClose: true,
      cssClass: 'my-custom-class'
    });
   
    return await this.modal.present();
  }
  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      if (this.seats.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
