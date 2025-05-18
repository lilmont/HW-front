import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHostsTableComponent } from './user-hosts-table.component';

describe('UserHostsTableComponent', () => {
  let component: UserHostsTableComponent;
  let fixture: ComponentFixture<UserHostsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserHostsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHostsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
