import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileColorsComponent } from './mobile-colors.component';

describe('MobileColorsComponent', () => {
  let component: MobileColorsComponent;
  let fixture: ComponentFixture<MobileColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileColorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileColorsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
