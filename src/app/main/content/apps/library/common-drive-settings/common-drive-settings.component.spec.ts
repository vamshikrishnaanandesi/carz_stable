import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDriveSettingsComponent } from './common-drive-settings.component';

describe('CommonDriveSettingsComponent', () => {
  let component: CommonDriveSettingsComponent;
  let fixture: ComponentFixture<CommonDriveSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonDriveSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonDriveSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
