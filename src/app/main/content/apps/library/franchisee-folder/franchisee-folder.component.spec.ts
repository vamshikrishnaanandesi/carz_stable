import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseeFolderComponent } from './franchisee-folder.component';

describe('FranchiseeFolderComponent', () => {
  let component: FranchiseeFolderComponent;
  let fixture: ComponentFixture<FranchiseeFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseeFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
