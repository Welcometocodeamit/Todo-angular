import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarDateComponent } from './bar-date.component';

describe('BarDateComponent', () => {
  let component: BarDateComponent;
  let fixture: ComponentFixture<BarDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarDateComponent]
    });
    fixture = TestBed.createComponent(BarDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
