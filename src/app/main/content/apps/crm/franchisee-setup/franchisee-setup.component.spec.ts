import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseeSetupComponent } from './franchisee-setup.component';

describe('FranchiseeSetupComponent', () => {
  let component: FranchiseeSetupComponent;
  let fixture: ComponentFixture<FranchiseeSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseeSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
