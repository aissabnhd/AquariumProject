import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecteurSearchComponent } from './secteur-search.component';

describe('SecteurSearchComponent', () => {
  let component: SecteurSearchComponent;
  let fixture: ComponentFixture<SecteurSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecteurSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecteurSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
