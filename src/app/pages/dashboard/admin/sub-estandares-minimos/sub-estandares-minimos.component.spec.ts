import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubEstandaresMinimosComponent } from './sub-estandares-minimos.component';

describe('SubEstandaresMinimosComponent', () => {
  let component: SubEstandaresMinimosComponent;
  let fixture: ComponentFixture<SubEstandaresMinimosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubEstandaresMinimosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubEstandaresMinimosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
