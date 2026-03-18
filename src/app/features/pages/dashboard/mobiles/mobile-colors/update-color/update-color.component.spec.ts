import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateColorComponent } from './update-color.component';

describe('UpdateColorComponent', () => {
  let component: UpdateColorComponent;
  let fixture: ComponentFixture<UpdateColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateColorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateColorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
