import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseeSeperateFolderComponent } from './franchisee-seperate-folder.component';

describe('FranchiseeSeperateFolderComponent', () => {
  let component: FranchiseeSeperateFolderComponent;
  let fixture: ComponentFixture<FranchiseeSeperateFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseeSeperateFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeSeperateFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
