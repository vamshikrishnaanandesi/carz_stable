import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketingSystemSingleComponent } from './ticketing-system-single.component';

describe('TicketingSystemSingleComponent', () => {
  let component: TicketingSystemSingleComponent;
  let fixture: ComponentFixture<TicketingSystemSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketingSystemSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketingSystemSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
