import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspeceSearchComponent } from './espece-search.component';

describe('EspeceSearchComponent', () => {
  let component: EspeceSearchComponent;
  let fixture: ComponentFixture<EspeceSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspeceSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspeceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
