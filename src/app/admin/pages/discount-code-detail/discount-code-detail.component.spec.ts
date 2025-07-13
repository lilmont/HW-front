import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCodeDetailComponent } from './discount-code-detail.component';

describe('DiscountCodeDetailComponent', () => {
  let component: DiscountCodeDetailComponent;
  let fixture: ComponentFixture<DiscountCodeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscountCodeDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountCodeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
