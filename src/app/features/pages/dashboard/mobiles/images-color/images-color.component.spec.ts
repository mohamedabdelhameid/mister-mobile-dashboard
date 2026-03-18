import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesColorComponent } from './images-color.component';

describe('ImagesColorComponent', () => {
  let component: ImagesColorComponent;
  let fixture: ComponentFixture<ImagesColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagesColorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImagesColorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
