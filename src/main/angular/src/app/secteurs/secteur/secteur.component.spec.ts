import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecteurComponent } from './secteur.component';

describe('SecteurComponent', () => {
  let component: SecteurComponent;
  let fixture: ComponentFixture<SecteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
