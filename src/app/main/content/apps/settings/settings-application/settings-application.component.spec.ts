import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsApplicationComponent } from './settings-application.component';

describe('SettingsApplicationComponent', () => {
  let component: SettingsApplicationComponent;
  let fixture: ComponentFixture<SettingsApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
