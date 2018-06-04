import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseeLoginComponent } from './franchisee-login.component';

describe('FranchiseeLoginComponent', () => {
  let component: FranchiseeLoginComponent;
  let fixture: ComponentFixture<FranchiseeLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseeLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
