import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFranchiseeComponent } from './master-franchisee.component';

describe('MasterFranchiseeComponent', () => {
  let component: MasterFranchiseeComponent;
  let fixture: ComponentFixture<MasterFranchiseeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterFranchiseeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterFranchiseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
