import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmFranchiseeComponent } from './crm-franchisee.component';

describe('CrmFranchiseeComponent', () => {
  let component: CrmFranchiseeComponent;
  let fixture: ComponentFixture<CrmFranchiseeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmFranchiseeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmFranchiseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
