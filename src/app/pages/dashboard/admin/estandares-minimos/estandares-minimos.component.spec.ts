import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstandaresMinimosComponent } from './estandares-minimos.component';

describe('EstandaresMinimosComponent', () => {
  let component: EstandaresMinimosComponent;
  let fixture: ComponentFixture<EstandaresMinimosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstandaresMinimosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstandaresMinimosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
