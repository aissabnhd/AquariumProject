import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspeceCreateComponent } from './espece-create.component';

describe('EspeceCreateComponent', () => {
  let component: EspeceCreateComponent;
  let fixture: ComponentFixture<EspeceCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspeceCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspeceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
