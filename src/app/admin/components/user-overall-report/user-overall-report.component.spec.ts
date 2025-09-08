import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOverallReportComponent } from './user-overall-report.component';

describe('UserOverallReportComponent', () => {
  let component: UserOverallReportComponent;
  let fixture: ComponentFixture<UserOverallReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserOverallReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOverallReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
