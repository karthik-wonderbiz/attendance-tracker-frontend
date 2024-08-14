import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgByteComponent } from './img-byte.component';

describe('ImgByteComponent', () => {
  let component: ImgByteComponent;
  let fixture: ComponentFixture<ImgByteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgByteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgByteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
