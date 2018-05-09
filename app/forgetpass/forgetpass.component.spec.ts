import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetpassComponent } from './forgetpass.component';

describe('ForgetpassComponent', () => {
  let component: ForgetpassComponent;
  let fixture: ComponentFixture<ForgetpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
