import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptAndAmmountComponent } from './accept-and-ammount.component';

describe('AcceptAndAmmountComponent', () => {
  let component: AcceptAndAmmountComponent;
  let fixture: ComponentFixture<AcceptAndAmmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptAndAmmountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptAndAmmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
