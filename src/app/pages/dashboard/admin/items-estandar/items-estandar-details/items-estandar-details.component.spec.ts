import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsEstandarDetailsComponent } from './items-estandar-details.component';

describe('ItemsEstandarDetailsComponent', () => {
  let component: ItemsEstandarDetailsComponent;
  let fixture: ComponentFixture<ItemsEstandarDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsEstandarDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsEstandarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
