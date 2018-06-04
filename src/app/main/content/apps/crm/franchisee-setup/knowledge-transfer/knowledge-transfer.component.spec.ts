import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeTransferComponent } from './knowledge-transfer.component';

describe('KnowledgeTransferComponent', () => {
  let component: KnowledgeTransferComponent;
  let fixture: ComponentFixture<KnowledgeTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
