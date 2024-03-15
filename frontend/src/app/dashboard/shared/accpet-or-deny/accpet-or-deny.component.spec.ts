import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccpetOrDenyComponent } from './accpet-or-deny.component';

describe('AccpetOrDenyComponent', () => {
  let component: AccpetOrDenyComponent;
  let fixture: ComponentFixture<AccpetOrDenyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccpetOrDenyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccpetOrDenyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
