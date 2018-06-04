import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFranchiseeViewComponent } from './master-franchisee-view.component';

describe('MasterFranchiseeViewComponent', () => {
  let component: MasterFranchiseeViewComponent;
  let fixture: ComponentFixture<MasterFranchiseeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterFranchiseeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterFranchiseeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
