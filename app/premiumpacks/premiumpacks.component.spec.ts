import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumpacksComponent } from './premiumpacks.component';

describe('PremiumpacksComponent', () => {
  let component: PremiumpacksComponent;
  let fixture: ComponentFixture<PremiumpacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumpacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumpacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
