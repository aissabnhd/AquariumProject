import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BassinModifierEspeceComponent } from './bassin-modifier-espece.component';

describe('BassinModifierEspeceComponent', () => {
  let component: BassinModifierEspeceComponent;
  let fixture: ComponentFixture<BassinModifierEspeceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BassinModifierEspeceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BassinModifierEspeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
