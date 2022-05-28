import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MovieDetailsService } from 'src/Services/movie-details.service';
import { movies } from 'src/entity/movies';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { TheatresComponent } from 'src/theatres/theatres.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  providers: [NgbCarouselConfig]
})
export class MovieDetailsComponent implements OnInit {
  movie: movies;
  images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);
  modal = null;
  constructor(private service: MovieDetailsService,
              private modalController: ModalController) { }
  ngOnInit() {
    const id = localStorage.getItem('_mid');
    this.service.getMovieDetail(id).subscribe(data =>
      {this.movie = data;});
  }
  async bookTickets(movieId:string) {
    this.modal = await this.modalController.create({
      component: TheatresComponent,
      componentProps:{
          movieId
      },
      swipeToClose: true,
      cssClass: 'my-custom-class'
    });
    return await this.modal.present();
  }
  dismissModal() {
    if (this.modal) {
      this.modal.dismiss().then(() => { this.modal = null; });
    }
  }
}
