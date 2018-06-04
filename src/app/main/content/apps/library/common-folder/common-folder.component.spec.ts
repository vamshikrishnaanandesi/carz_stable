import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFolderComponent } from './common-folder.component';

describe('CommonFolderComponent', () => {
  let component: CommonFolderComponent;
  let fixture: ComponentFixture<CommonFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
