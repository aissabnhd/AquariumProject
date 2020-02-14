import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BassinSearchComponent } from './bassin-search.component';

describe('BassinSearchComponent', () => {
  let component: BassinSearchComponent;
  let fixture: ComponentFixture<BassinSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BassinSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BassinSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
