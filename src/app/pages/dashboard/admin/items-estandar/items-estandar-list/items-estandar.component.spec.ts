import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsEstandarComponent } from './items-estandar.component';

describe('ItemsEstandarComponent', () => {
  let component: ItemsEstandarComponent;
  let fixture: ComponentFixture<ItemsEstandarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsEstandarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsEstandarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
