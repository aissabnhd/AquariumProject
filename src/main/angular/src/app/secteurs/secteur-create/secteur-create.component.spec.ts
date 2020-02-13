import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecteurCreateComponent } from './secteur-create.component';

describe('SecteurCreateComponent', () => {
  let component: SecteurCreateComponent;
  let fixture: ComponentFixture<SecteurCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecteurCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecteurCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
