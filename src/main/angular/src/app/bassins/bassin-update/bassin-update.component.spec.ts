import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BassinUpdateComponent } from './bassin-update.component';

describe('BassinUpdateComponent', () => {
  let component: BassinUpdateComponent;
  let fixture: ComponentFixture<BassinUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BassinUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BassinUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
