import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagecompletepopComponent } from './stagecompletepop.component';

describe('StagecompletepopComponent', () => {
  let component: StagecompletepopComponent;
  let fixture: ComponentFixture<StagecompletepopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagecompletepopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagecompletepopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
