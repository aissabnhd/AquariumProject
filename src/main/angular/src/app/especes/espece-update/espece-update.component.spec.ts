import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspeceUpdateComponent } from './espece-update.component';

describe('EspeceUpdateComponent', () => {
  let component: EspeceUpdateComponent;
  let fixture: ComponentFixture<EspeceUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspeceUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspeceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
