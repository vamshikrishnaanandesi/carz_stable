import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeTransfer2Component } from './knowledge-transfer2.component';

describe('KnowledgeTransfer2Component', () => {
  let component: KnowledgeTransfer2Component;
  let fixture: ComponentFixture<KnowledgeTransfer2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeTransfer2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeTransfer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
