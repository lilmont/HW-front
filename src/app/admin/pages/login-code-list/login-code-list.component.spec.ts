import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCodeListComponent } from './login-code-list.component';

describe('LoginCodeListComponent', () => {
  let component: LoginCodeListComponent;
  let fixture: ComponentFixture<LoginCodeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginCodeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
