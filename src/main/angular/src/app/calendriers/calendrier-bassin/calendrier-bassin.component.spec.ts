import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierBassinComponent } from './calendrier-bassin.component';

describe('CalendrierBassinComponent', () => {
  let component: CalendrierBassinComponent;
  let fixture: ComponentFixture<CalendrierBassinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendrierBassinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierBassinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
