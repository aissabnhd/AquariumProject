import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecteurFicheComponent } from './secteur-fiche.component';

describe('SecteurFicheComponent', () => {
  let component: SecteurFicheComponent;
  let fixture: ComponentFixture<SecteurFicheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecteurFicheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecteurFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
