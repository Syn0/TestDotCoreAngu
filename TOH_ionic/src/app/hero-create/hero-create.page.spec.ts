import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeroCreatePage } from './hero-create.page';

describe('HeroCreatePage', () => {
  let component: HeroCreatePage;
  let fixture: ComponentFixture<HeroCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
