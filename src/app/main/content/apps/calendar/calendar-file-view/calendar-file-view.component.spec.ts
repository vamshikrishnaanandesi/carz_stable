import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarFileViewComponent } from './calendar-file-view.component';

describe('CalendarFileViewComponent', () => {
  let component: CalendarFileViewComponent;
  let fixture: ComponentFixture<CalendarFileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarFileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarFileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
