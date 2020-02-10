import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimauxComponent } from './animaux.component';

describe('AnimauxComponent', () => {
  let component: AnimauxComponent;
  let fixture: ComponentFixture<AnimauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
