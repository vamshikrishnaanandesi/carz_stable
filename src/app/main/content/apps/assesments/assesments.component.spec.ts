import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssesmentsComponent } from './assesments.component';

describe('AssesmentsComponent', () => {
  let component: AssesmentsComponent;
  let fixture: ComponentFixture<AssesmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssesmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssesmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
