import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspeceFicheComponent } from './espece-fiche.component';

describe('EspeceFicheComponent', () => {
  let component: EspeceFicheComponent;
  let fixture: ComponentFixture<EspeceFicheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspeceFicheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspeceFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
