import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBanerComponent } from './hero-baner.component';

describe('HeroBanerComponent', () => {
  let component: HeroBanerComponent;
  let fixture: ComponentFixture<HeroBanerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroBanerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroBanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
