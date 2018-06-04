import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFileViewComponent } from './dialog-file-view.component';

describe('DialogFileViewComponent', () => {
  let component: DialogFileViewComponent;
  let fixture: ComponentFixture<DialogFileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
