import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUpHeadingComponent } from './set-up-heading.component';

describe('SetUpHeadingComponent', () => {
  let component: SetUpHeadingComponent;
  let fixture: ComponentFixture<SetUpHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetUpHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetUpHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
