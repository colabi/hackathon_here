import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BgComponent } from './bg.component';

describe('BgComponent', () => {
  let component: BgComponent;
  let fixture: ComponentFixture<BgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
