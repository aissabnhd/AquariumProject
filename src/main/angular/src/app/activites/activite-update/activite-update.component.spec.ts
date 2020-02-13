import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteUpdateComponent } from './activite-update.component';

describe('ActiviteUpdateComponent', () => {
  let component: ActiviteUpdateComponent;
  let fixture: ComponentFixture<ActiviteUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
