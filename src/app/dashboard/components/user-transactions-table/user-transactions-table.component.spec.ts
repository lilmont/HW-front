import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTransactionsTableComponent } from './user-transactions-table.component';

describe('UserTransactionsTableComponent', () => {
  let component: UserTransactionsTableComponent;
  let fixture: ComponentFixture<UserTransactionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTransactionsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTransactionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
