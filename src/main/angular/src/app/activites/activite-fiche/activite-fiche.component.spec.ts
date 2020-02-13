import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteFicheComponent } from './activite-fiche.component';

describe('ActiviteFicheComponent', () => {
  let component: ActiviteFicheComponent;
  let fixture: ComponentFixture<ActiviteFicheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteFicheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
