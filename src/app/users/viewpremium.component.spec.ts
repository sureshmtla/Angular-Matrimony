import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpremiumComponent } from './viewpremium.component';

describe('ViewpremiumComponent', () => {
  let component: ViewpremiumComponent;
  let fixture: ComponentFixture<ViewpremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpremiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
