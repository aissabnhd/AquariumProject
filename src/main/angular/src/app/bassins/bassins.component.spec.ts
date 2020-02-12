import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BassinsComponent } from './bassins.component';

describe('BassinsComponent', () => {
  let component: BassinsComponent;
  let fixture: ComponentFixture<BassinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BassinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BassinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
