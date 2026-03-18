import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMobileComponent } from './update-mobile.component';

describe('UpdateMobileComponent', () => {
  let component: UpdateMobileComponent;
  let fixture: ComponentFixture<UpdateMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateMobileComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
