import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendriersComponent } from './calendriers.component';

describe('CalendriersComponent', () => {
  let component: CalendriersComponent;
  let fixture: ComponentFixture<CalendriersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendriersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendriersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
