import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionForumSingleComponent } from './discussion-forum-single.component';

describe('DiscussionForumSingleComponent', () => {
  let component: DiscussionForumSingleComponent;
  let fixture: ComponentFixture<DiscussionForumSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionForumSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionForumSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
