import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHostsComponent } from './user-hosts.component';

describe('UserHostsComponent', () => {
  let component: UserHostsComponent;
  let fixture: ComponentFixture<UserHostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserHostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
