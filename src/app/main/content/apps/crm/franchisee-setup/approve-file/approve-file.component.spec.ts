import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveFileComponent } from './approve-file.component';

describe('ApproveFileComponent', () => {
  let component: ApproveFileComponent;
  let fixture: ComponentFixture<ApproveFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
