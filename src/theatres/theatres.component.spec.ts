import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TheatresComponent } from './theatres.component';

describe('TheatresComponent', () => {
  let component: TheatresComponent;
  let fixture: ComponentFixture<TheatresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheatresComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TheatresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
