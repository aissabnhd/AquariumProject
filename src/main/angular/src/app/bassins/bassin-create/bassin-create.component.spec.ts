import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BassinCreateComponent } from './bassin-create.component';

describe('BassinCreateComponent', () => {
  let component: BassinCreateComponent;
  let fixture: ComponentFixture<BassinCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BassinCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BassinCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
