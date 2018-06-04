import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmFranchiseeListComponent } from './crm-franchisee-list.component';

describe('CrmFranchiseeListComponent', () => {
  let component: CrmFranchiseeListComponent;
  let fixture: ComponentFixture<CrmFranchiseeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmFranchiseeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmFranchiseeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
