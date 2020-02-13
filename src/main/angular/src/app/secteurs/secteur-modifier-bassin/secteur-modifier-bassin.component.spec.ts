import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecteurModifierBassinComponent } from './secteur-modifier-bassin.component';

describe('SecteurModifierBassinComponent', () => {
  let component: SecteurModifierBassinComponent;
  let fixture: ComponentFixture<SecteurModifierBassinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecteurModifierBassinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecteurModifierBassinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
