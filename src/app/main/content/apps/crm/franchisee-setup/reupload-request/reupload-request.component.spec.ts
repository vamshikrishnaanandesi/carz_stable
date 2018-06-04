import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuploadRequestComponent } from './reupload-request.component';

describe('ReuploadRequestComponent', () => {
  let component: ReuploadRequestComponent;
  let fixture: ComponentFixture<ReuploadRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReuploadRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReuploadRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
