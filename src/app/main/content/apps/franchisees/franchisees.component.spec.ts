import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseesComponent } from './franchisees.component';

describe('FranchiseesComponent', () => {
  let component: FranchiseesComponent;
  let fixture: ComponentFixture<FranchiseesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
