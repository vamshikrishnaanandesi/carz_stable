import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFranchiseeListComponent } from './master-franchisee-list.component';

describe('MasterFranchiseeListComponent', () => {
  let component: MasterFranchiseeListComponent;
  let fixture: ComponentFixture<MasterFranchiseeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterFranchiseeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterFranchiseeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
