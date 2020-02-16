import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeUpdateComponent } from './employe-update.component';

describe('EmployeUpdateComponent', () => {
  let component: EmployeUpdateComponent;
  let fixture: ComponentFixture<EmployeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
