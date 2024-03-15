import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryItemViewDialogComponent } from './laundry-item-view-dialog.component';

describe('LaundryItemViewDialogComponent', () => {
  let component: LaundryItemViewDialogComponent;
  let fixture: ComponentFixture<LaundryItemViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaundryItemViewDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundryItemViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
