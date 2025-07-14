import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportAnnouncementListComponent } from './support-announcement-list.component';

describe('SupportAnnouncementListComponent', () => {
  let component: SupportAnnouncementListComponent;
  let fixture: ComponentFixture<SupportAnnouncementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportAnnouncementListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportAnnouncementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
