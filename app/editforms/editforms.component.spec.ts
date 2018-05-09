import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditformsComponent } from './editforms.component';

describe('EditformsComponent', () => {
  let component: EditformsComponent;
  let fixture: ComponentFixture<EditformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
