import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfilesetupstageComponent } from './viewfilesetupstage.component';

describe('ViewfilesetupstageComponent', () => {
  let component: ViewfilesetupstageComponent;
  let fixture: ComponentFixture<ViewfilesetupstageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewfilesetupstageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewfilesetupstageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
