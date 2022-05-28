import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Theatres } from 'src/entity/theatres';
import { Screens } from 'src/entity/screens';
import { Shows } from 'src/entity/shows';
import { showTimmings } from 'src/entity/showTimmings';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { payment } from 'src/entity/payment';
import { bookings } from 'src/entity/bookings';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/Services/authentication.service';
import { BookTicketService } from 'src/Services/book-ticket.service';
import * as html2pdf from 'html2pdf.js';
import { users } from 'src/entity/user';
import { SharedService } from 'src/Shared/shared.service';
import { appResponse } from 'src/Services/movieBookingResponse';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit,OnDestroy {
  @Input()theatre : Theatres;
  @Input()screen : Screens;
  @Input()show : Shows;
  @Input()timmings : showTimmings;
  @Input()tickets: Array<string>;
  @Input()cost: number;
  credit=false;
  netbanking=false;
  upi=false;
  cardform:FormGroup;
  upiform:FormGroup;
  currentuser:Subscription;
  bookingId:string;
  user:users;
  seats:string="";
  download=false;
  banknames=["HDFC","HSBC","SBI","Axis","CITI","American Express"];
  upiMerchNames=["Phone Pe","Paytm","Paypal","Google Pay"];
  cardType=["Visa","Master"];
  loading=true;
  constructor(private modalctrl:ModalController,
              private fb:FormBuilder,
              private service:BookTicketService,
              private sharedService:SharedService,
              private domSanitizer: DomSanitizer,
              private authenticationService:AuthenticationService,
              private matIconRegistry: MatIconRegistry) { this.matIconRegistry.addSvgIcon(
                'Visa',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/visa.svg')
              );this.matIconRegistry.addSvgIcon(
                'card',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/mastercard.svg')
              );this.matIconRegistry.addSvgIcon(
                'netbank',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/bank.svg')
              );this.matIconRegistry.addSvgIcon(
                'upi',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/upi.svg')
              );this.matIconRegistry.addSvgIcon(
                'Phone Pe',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/phonepe.svg')
              );this.matIconRegistry.addSvgIcon(
                'Master',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/mastercard.svg')
              );this.matIconRegistry.addSvgIcon(
                'Google Pay',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/googlePay.svg')
              );this.matIconRegistry.addSvgIcon(
                'Paytm',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/paytm.svg')
              );this.matIconRegistry.addSvgIcon(
                'Axis',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/AxisBank.svg')
              );this.matIconRegistry.addSvgIcon(
                'American Express',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/american-express.svg')
              );this.matIconRegistry.addSvgIcon(
                'HDFC',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/HDFC_Bank.svg')
              );this.matIconRegistry.addSvgIcon(
                'HSBC',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/hsbc.svg')
              );this.matIconRegistry.addSvgIcon(
                'CITI',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/citi.svg')
              );this.matIconRegistry.addSvgIcon(
                'Paypal',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/paypal.svg')
              );this.matIconRegistry.addSvgIcon(
                'SBI',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/sbi.svg')
              );}

  ngOnInit() {
    this.cardform = this.fb.group({
      bankName: ['', Validators.required],
      cardType: ['', Validators.required],
      cardNo: ['', Validators.required],
      cvv: ['', Validators.required],
      saveCard:['true']
    });
    this.upiform = this.fb.group({
      upimerch: ['', Validators.required],
      bankName: ['', Validators.required],
      upiId: ['', Validators.required],
      pin: ['', Validators.required],
      saveCard:['true']
    });
    this.currentuser = this.authenticationService.currentUserSubject.subscribe(value => {
     this.user=value;
     this.loading=false;
    });

  }

  dismissModal() {
    this.modalctrl.dismiss({
      'dismissed': true
    });
  }
card(){
  this.credit=!this.credit;
  this.netbanking=false;
  this.upi=false;
}
_netbanking(){
  this.netbanking=!this.netbanking;
  this.credit=false;
  this.upi=false;
}
_upi(){
  this.upi=!this.upi;
  this.credit=false;
  this.netbanking=false;
}

payCard(form:FormGroup){
  const payment:payment={
    type:"Card",
    card:form.value.cardNo,
    cardType:form.value.cardType,
    bank:form.value.bankName,
    upi:"",
    upiMerchant:"",
    pin:form.value.cvv
  }
  this.Confirmpayment(payment,form.value.saveCard);
  
}
payUpi(form:FormGroup){
  const payment:payment={
    type:"UPI",
    card:"",
    cardType:"",
    bank:form.value.bankName,
    upi:form.value.upiId,
    upiMerchant:form.value.upimerch,
    pin:form.value.pin
  }
  this.Confirmpayment(payment,form.value.saveCard);
}
Confirmpayment(payment:payment,save:boolean){
  this.tickets.forEach(ticket=>this.seats=this.seats+"  "+ticket);
  var date:Date;
  date=new Date();
  const booking:bookings={
    userID:this.user.id,
    movieID:localStorage.getItem('_mid'),
    screenID:this.screen.id,
    timmingID:this.timmings.id,
    noOfTickets:this.tickets.length,
    payment:payment,
    price:this.cost,
    theatreID:this.theatre.id,
    bookingDate:date
  }
  this.download=true;
  this.service.booking(booking,this.tickets,this.timmings.id).subscribe((data:appResponse)=>{
      const options = {
        margin:       1,
        filename:     'payment_'+this.user.id+'.pdf',
        image:        { type: 'jpeg' },
        html2canvas:  { },
        jsPDF:        { orientation: 'landscape' }
        };
        
        const content=document.getElementById('content') as HTMLElement;
        this.download=false;
        html2pdf().from(content).set(options).save();
        this.dismissModal();
        console.log(data);
        this.user.bookings.push(data.message);
        if(save){
          this.user.preferences.savedPayments.push(payment);
        }
        this.service.saveCard(this.user).subscribe((data)=>{
        });
  }) 
}

quickPayment(payment:payment,i:number){
  if(document.getElementById(i+"").style.display=="none")
  document.getElementById(i+"").style.display="block";
  else
  document.getElementById(i+"").style.display="none";
}
checkPin(pin:string,payment:payment){
 if(payment.pin === pin){
   this.Confirmpayment(payment,false);
 }

}
ngOnDestroy(){
  this.currentuser.unsubscribe();
}
}
