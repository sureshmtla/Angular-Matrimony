import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepremiumComponent } from './updatepremium.component';

describe('UpdatepremiumComponent', () => {
  let component: UpdatepremiumComponent;
  let fixture: ComponentFixture<UpdatepremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatepremiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
