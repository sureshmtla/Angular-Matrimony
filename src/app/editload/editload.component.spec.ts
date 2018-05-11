import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditloadComponent } from './editload.component';

describe('EditloadComponent', () => {
  let component: EditloadComponent;
  let fixture: ComponentFixture<EditloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
