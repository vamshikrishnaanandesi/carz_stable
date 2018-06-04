import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionDialogViewComponent } from './discussion-dialog-view.component';

describe('DiscussionDialogViewComponent', () => {
  let component: DiscussionDialogViewComponent;
  let fixture: ComponentFixture<DiscussionDialogViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionDialogViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionDialogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
