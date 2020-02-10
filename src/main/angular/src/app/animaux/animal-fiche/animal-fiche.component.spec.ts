import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalFicheComponent } from './animal-fiche.component';

describe('AnimalFicheComponent', () => {
  let component: AnimalFicheComponent;
  let fixture: ComponentFixture<AnimalFicheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalFicheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
