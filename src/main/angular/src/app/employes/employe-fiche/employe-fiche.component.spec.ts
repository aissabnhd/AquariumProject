import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeFicheComponent } from './employe-fiche.component';

describe('EmployeFicheComponent', () => {
  let component: EmployeFicheComponent;
  let fixture: ComponentFixture<EmployeFicheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeFicheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
