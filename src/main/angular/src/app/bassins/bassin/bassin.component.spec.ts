import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BassinComponent } from './bassin.component';

describe('BassinComponent', () => {
  let component: BassinComponent;
  let fixture: ComponentFixture<BassinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BassinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BassinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
