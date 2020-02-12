import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BassinFicheComponent } from './bassin-fiche.component';

describe('BassinFicheComponent', () => {
  let component: BassinFicheComponent;
  let fixture: ComponentFixture<BassinFicheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BassinFicheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BassinFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
