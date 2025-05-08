import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitReceiptComponent } from './submit-receipt.component';

describe('SubmitReceiptComponent', () => {
  let component: SubmitReceiptComponent;
  let fixture: ComponentFixture<SubmitReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmitReceiptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
