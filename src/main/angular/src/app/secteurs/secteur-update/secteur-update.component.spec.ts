import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecteurUpdateComponent } from './secteur-update.component';

describe('SecteurUpdateComponent', () => {
  let component: SecteurUpdateComponent;
  let fixture: ComponentFixture<SecteurUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecteurUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecteurUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
