import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseeViewComponent } from './franchisee-view.component';

describe('FranchiseeViewComponent', () => {
  let component: FranchiseeViewComponent;
  let fixture: ComponentFixture<FranchiseeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
