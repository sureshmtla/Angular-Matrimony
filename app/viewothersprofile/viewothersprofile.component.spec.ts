import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewothersprofileComponent } from './viewothersprofile.component';

describe('ViewothersprofileComponent', () => {
  let component: ViewothersprofileComponent;
  let fixture: ComponentFixture<ViewothersprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewothersprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewothersprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
