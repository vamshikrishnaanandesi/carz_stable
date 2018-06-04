import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatefranchiseeComponent } from './createfranchisee.component';

describe('CreatefranchiseeComponent', () => {
  let component: CreatefranchiseeComponent;
  let fixture: ComponentFixture<CreatefranchiseeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatefranchiseeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatefranchiseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
