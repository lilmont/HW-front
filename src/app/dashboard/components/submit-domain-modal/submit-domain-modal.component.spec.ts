import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitDomainModalComponent } from './submit-domain-modal.component';

describe('SubmitDomainModalComponent', () => {
  let component: SubmitDomainModalComponent;
  let fixture: ComponentFixture<SubmitDomainModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmitDomainModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitDomainModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
