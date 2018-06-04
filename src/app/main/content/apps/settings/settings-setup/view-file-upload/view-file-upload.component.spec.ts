import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFileUploadComponent } from './view-file-upload.component';

describe('ViewFileUploadComponent', () => {
  let component: ViewFileUploadComponent;
  let fixture: ComponentFixture<ViewFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
