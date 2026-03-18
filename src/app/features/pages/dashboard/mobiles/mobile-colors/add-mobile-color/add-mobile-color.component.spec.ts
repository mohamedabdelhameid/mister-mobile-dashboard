import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMobileColorComponent } from './add-mobile-color.component';

describe('AddMobileColorComponent', () => {
  let component: AddMobileColorComponent;
  let fixture: ComponentFixture<AddMobileColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMobileColorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddMobileColorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
