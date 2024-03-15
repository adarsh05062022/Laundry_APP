import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeRequestFormComponent } from './make-request-form.component';

describe('MakeRequestFormComponent', () => {
  let component: MakeRequestFormComponent;
  let fixture: ComponentFixture<MakeRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeRequestFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
