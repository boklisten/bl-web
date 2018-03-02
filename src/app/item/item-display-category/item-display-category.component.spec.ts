import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDisplayCategoryComponent } from './item-display-category.component';

describe('ItemDisplayCategoryComponent', () => {
  let component: ItemDisplayCategoryComponent;
  let fixture: ComponentFixture<ItemDisplayCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDisplayCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDisplayCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
