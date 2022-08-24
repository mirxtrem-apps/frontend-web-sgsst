import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsEstandarCreateComponent } from './items-estandar-create.component';

describe('ItemsEstandarCreateComponent', () => {
  let component: ItemsEstandarCreateComponent;
  let fixture: ComponentFixture<ItemsEstandarCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsEstandarCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsEstandarCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
