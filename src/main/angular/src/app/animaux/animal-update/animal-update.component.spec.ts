import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalUpdateComponent } from './animal-update.component';

describe('AnimalUpdateComponent', () => {
  let component: AnimalUpdateComponent;
  let fixture: ComponentFixture<AnimalUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
