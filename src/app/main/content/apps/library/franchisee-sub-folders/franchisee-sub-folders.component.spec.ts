import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseeSubFoldersComponent } from './franchisee-sub-folders.component';

describe('FranchiseeSubFoldersComponent', () => {
  let component: FranchiseeSubFoldersComponent;
  let fixture: ComponentFixture<FranchiseeSubFoldersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseeSubFoldersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeSubFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
