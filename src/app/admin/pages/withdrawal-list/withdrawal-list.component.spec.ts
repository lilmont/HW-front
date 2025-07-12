import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalListComponent } from './withdrawal-list.component';

describe('WithdrawalListComponent', () => {
  let component: WithdrawalListComponent;
  let fixture: ComponentFixture<WithdrawalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WithdrawalListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
