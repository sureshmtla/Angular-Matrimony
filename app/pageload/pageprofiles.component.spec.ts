import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageprofilesComponent } from './pageprofiles.component';

describe('PageprofilesComponent', () => {
  let component: PageprofilesComponent;
  let fixture: ComponentFixture<PageprofilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageprofilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageprofilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
