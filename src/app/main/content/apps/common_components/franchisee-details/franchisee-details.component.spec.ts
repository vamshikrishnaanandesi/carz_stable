import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseeDetailsComponent } from './franchisee-details.component';

describe('FranchiseeDetailsComponent', () => {
  let component: FranchiseeDetailsComponent;
  let fixture: ComponentFixture<FranchiseeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
