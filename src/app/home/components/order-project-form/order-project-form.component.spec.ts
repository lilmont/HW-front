import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProjectFormComponent } from './order-project-form.component';

describe('OrderProjectFormComponent', () => {
  let component: OrderProjectFormComponent;
  let fixture: ComponentFixture<OrderProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderProjectFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
