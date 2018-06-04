import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseeListComponent } from './franchisee-list.component';

describe('FranchiseeListComponent', () => {
  let component: FranchiseeListComponent;
  let fixture: ComponentFixture<FranchiseeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
