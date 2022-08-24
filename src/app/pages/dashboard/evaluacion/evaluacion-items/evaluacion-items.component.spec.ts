import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionItemsComponent } from './evaluacion-items.component';

describe('EvaluacionItemsComponent', () => {
  let component: EvaluacionItemsComponent;
  let fixture: ComponentFixture<EvaluacionItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
